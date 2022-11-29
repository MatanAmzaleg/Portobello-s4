<template>
  <div class="container home">
    <h1>#i Most popular templates</h1>
    <p>Get going faster with a template from the Trello community or</p>
    <ul class="board-list">
      <li v-for="board in boards" :key="board._id">
        <article class="board" @click="">
          <p>
            {{board.title}}
          </p>
        </article>
      </li>
    </ul>
    <hr />
    <form @submit.prevent="addBoard()">
      <h2>Add board</h2>
      <input type="text" v-model="boardToAdd.title" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'
import {boardService} from '../services/board.service.js'
import { getActionRemoveBoard, getActionUpdateBoard, getActionAddBoardMsg } from '../store/board.store'
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard()
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    boards() {
      return this.$store.getters.boards
    }
  },
  created() {
    this.$store.dispatch({type: 'loadBoards'})
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({type: 'addBoard', board: this.boardToAdd})
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add board')
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId))
        showSuccessMsg('Board removed')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot remove board')
      }
    },
    async updateBoard(board) {
      try {
        board = {...board}
        board.price = +prompt('New price?', board.price)
        await this.$store.dispatch(getActionUpdateBoard(board))
        showSuccessMsg('Board updated')

      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot update board')
      }
    },
    async addBoardMsg(boardId) {
      try {
        await this.$store.dispatch(getActionAddBoardMsg(boardId))
        showSuccessMsg('Board msg added')
      } catch(err) {
        console.log(err)
        showErrorMsg('Cannot add board msg')
      }
    },
    printBoardToConsole(board) {
      console.log('Board msgs:', board.msgs)
    }
  }

  
}
</script>


<style lang="scss">
.container.home{
  max-width: 825px;
  margin-inline: auto;
  margin: 40px auto 0;

  .board-list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    gap: 16.5px;
    padding: 0;

    li{
      list-style-type: none;
    }

    .board{
      width: 193px;
      height: 96px;
      padding: 8px;
      background-color:rgb(152, 212, 192);
      border-radius: 5px;
      cursor: pointer;
    }
  }

}
</style>
