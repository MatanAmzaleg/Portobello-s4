import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";
import { storageService } from "./async-storage.service.js";

import data from '../../fixed-dta.json' assert {type: 'json'};


const STORAGE_KEY = "board";

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  getTask,
  getTaskById,
  getGroupById,
  saveTask,
  getEmptyTask,
  removeTask
};
window.boardService = boardService;

async function query(filterBy = { txt: "" }) {
  var boards = await storageService.query(STORAGE_KEY);
  // return httpService.get(STORAGE_KEY, filterBy)

  // var boards = await storageService.query(STORAGE_KEY)
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
  // }
  // if (filterBy.price) {
  //     boards = boards.filter(board => board.price <= filterBy.price)
  // }
  return boards;
}
function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId);
  // return httpService.get(`board/${boardId}`)
}

async function getGroupById(boardId, groupId) {
  try {
    const board = await getById(boardId)
    return board.groups.find(group => group.id === groupId)
  } catch(err) {
    console.log(err)
  }
}

function getTaskById(board, taskId) {
  var task
  board.groups.forEach(group => {
    group.tasks.forEach((t) => {
      if (t.id === taskId) {
        task = t
      }
    })
  });
  return task
}
function removeTask(board, taskId) {
  let boardCopy = JSON.parse(JSON.stringify(board))
  let taskIdx;
  let groupIdx = boardCopy.groups.findIndex((group) =>
    group.tasks.some((task, idx) => {
      if (task.id === taskId) taskIdx = idx;
      return task.id === taskId
    }))
    boardCopy.groups[groupIdx].tasks.splice(taskIdx,1)
    return storageService.put(STORAGE_KEY, boardCopy)

}

function getTask(boardId, groupId, taskId) {
  return storageService.get(STORAGE_KEY, boardId)
    .then(board => board.groups.find(group => group.id === groupId))
    .then(group => group.tasks.find(task => task.id === taskId))
}
// function removeTask(boardId, groupId, taskId) {
//   return storageService.remove(STORAGE_KEY, boardId)
//     .then(board => board.groups.find(group => group.id === groupId))
//     .then(group => group.tasks.find(task => task.id === taskId))
// }
function saveTask(boardId, groupId, taskToSave) {
  if (taskToSave.id) {
    return storageService.get(STORAGE_KEY, boardId)
      .then(board => {
        let groupIdx = board.groups.findIndex(group => group.id === groupId)
        let taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskToSave.id)
        board.groups[groupIdx].tasks[taskIdx] = taskToSave
        return board
      })
      .then(newBoard => storageService.put(STORAGE_KEY, newBoard))
  }
  else {
    return storageService.get(STORAGE_KEY, boardId)
      .then(board => {
        let groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups[groupIdx].tasks.push(taskToSave)
        return board
      })
      .then(newBoard => storageService.put(STORAGE_KEY, newBoard))
  }
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId);
  // return httpService.delete(`board/${boardId}`)
}
async function save(board) {
  var savedBoard;
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
    // savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser();
    savedBoard = await storageService.post(STORAGE_KEY, board);
    // savedBoard = await httpService.post('board', board)
  }
  return savedBoard;
}

async function addBoardMsg(boardId, txt) {
  const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt });
  return savedMsg;
}


function getEmptyTask() {
  return {
    status: "", priority: "", description: "",
    comments: [],
    checklists: [],
    memberIds: [],
    labelIds: [],
    dueDate: '',
    byMember: {},
    style: {}
  }
}

function getEmptyBoard() {
  const board = data[0]
  delete board._id
  return board
}