import { boardService } from "../services/board.service.js";
// import { boardService } from "../services/board-service-local.js";
import { utilService } from "../services/util.service.js";

export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    currTask: null,
  },
  getters: {
    boards({ boards }) {
      return boards;
    },
    currBoard({ currBoard }) {
      return currBoard;
    },
    emptyTask() {
      return boardService.getEmptyTask();
    },
    currTask({ currTask }) {
      return currTask;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    addBoard(state, { board }) {
      state.boards.push(board);
      state.currBoard = board;
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((c) => c._id === board._id);
      state.boards.splice(idx, 1, board);
      state.currBoard = board;
    },
    updateRemoveStarredBoard(state, { board }) {
      const idx = state.boards.findIndex((c) => c._id === board._id);
      state.boards.splice(idx, 1, board);
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId);
    },
    addBoardMsg(state, { boardId, msg }) {
      const board = state.boards.find((board) => board._id === boardId);
      if (!board.msgs) board.msgs = [];
      board.msgs.push(msg);
    },
    setCurrBoard(state, newBoard) {
      const { board, filteredBoard } = newBoard;
      state.currBoard = board ? board : filteredBoard;
    },
    setTask(state, { task }) {
      state.currTask = task;
    },
  },
  actions: {
    async addBoard(context, { board }) {
      try {
        board = await boardService.save(board);
        context.commit({ type: "addBoard", board });
        return board;
      } catch (err) {
        console.log("boardStore: Error in addBoard", err);
        throw err;
      }
    },
    async createNewBoard(context, { board }) {
      try {
        const newBoard = await boardService.getEmptyBoard();
        newBoard.title = board.title;
        (newBoard.style = {
          bgColor: board.style.bgColor,
          imgUrl: board.style.imgUrl,
          calcColor: board.style.calcColor
        }),
          (board = await boardService.save(newBoard));
        context.commit({ type: "addBoard", board });
        return board;
      } catch (err) {
        console.log("boardStore: Error in addBoard", err);
        throw err;
      }
    },
    async updateBoard(context, { board }) {
      try {
        board = await boardService.save(board);
        context.commit({ type: "updateBoard", board });
        return board;
      } catch (err) {
        console.log("boardStore: Error in updateBoard", err);
        throw err;
      }
    },
    async updateRemoveStarredBoard(context, { board }) {
      try {
        board = await boardService.save(board);
        context.commit({ type: "updateRemoveStarredBoard", board });
        // context.commit("setCurrBoard", board)
        return board;
      } catch (err) {
        console.log("boardStore: Error in updateBoard", err);
        throw err;
      }
    },
    async loadBoards(context, filterBy) {
      try {
        const boards = await boardService.query();
        context.commit({ type: "setBoards", boards });
      } catch (err) {
        console.log("boardStore: Error in loadBoards", err);
        throw err;
      }
    },
    async removeBoard(context, { boardId }) {
      try {
        await boardService.remove(boardId);
        context.commit({ type: "removeBoard", boardId });
      } catch (err) {
        console.log("boardStore: Error in removeBoard", err);
        throw err;
      }
    },
    async addBoardMsg(context, { boardId, txt }) {
      try {
        const msg = await boardService.addBoardMsg(boardId, txt);
        context.commit({ type: "addBoardMsg", boardId, msg });
      } catch (err) {
        console.log("boardStore: Error in addBoardMsg", err);
        throw err;
      }
    },
    async setCurrBoard({ commit }, { boardId, filterBy }) {
      try {
        const board = await boardService.getById(boardId);
        if (filterBy) {
          const filteredBoard = await utilService.filterBoard(board, filterBy);
          commit({ type: "setCurrBoard", filteredBoard });
        } else commit({ type: "setCurrBoard", board });
        return board;
      } catch (err) {
        console.log("boardStore: Error in setCurrBoard", err);
        throw err;
      }
    },
    async loadTask({ commit }, { board, taskId }) {
      try {
        const task = await boardService.getTaskById(board, taskId);
        commit({ type: "setTask", task });
        return task;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask({ commit }, { board, taskId }) {
      console.log(taskId);
      try {
        const newBoard = await boardService.removeTask(board, taskId);
        commit({ type: "updateBoard", board: newBoard });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
