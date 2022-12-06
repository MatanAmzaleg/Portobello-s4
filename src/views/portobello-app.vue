<template>
  <div class="home">
    <section v-if="starredBoards.length" class="board-section recently">
      <div class="recently-title">
        <span>
          <font-awesome-icon class="star-icon" icon="fa-regular fa-star" />
        </span>
        <h3>Starred boards</h3>
      </div>
      <div>
        <ul class="board-list">
          <li
            v-for="board in starredBoards"
            :key="board._id"
            class="board-li"
          >
            <article
              class="board"
              @click="moveToBoard(board)"
              :style="
                board.style?.bgColor
                  ? { 'background-color': board.style?.bgColor }
                  : board.style?.imgUrl
                  ? {
                      'background-image': 'url( ' + board.style?.imgUrl + ')',
                      'background-size': 'cover',
                    }
                  : ''
              "
            >
              <div class="board-preview">
                <p class="board-preview-title">
                  {{ board.title }}
                </p>
                <img
                  class="yellow-star"
                  src="../assets/icons/star.png"
                  alt=""
                  v-if="board.isStarred"
                />
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <section class="board-section recently">
      <div class="recently-title">
        <span>
          <font-awesome-icon icon="fa-regular fa-clock" />
        </span>
        <h3>Recently viewed</h3>
      </div>
      <div>
        <ul class="board-list">
          <li
            v-for="board in boards.slice(0, 4)"
            :key="board._id"
            class="board-li"
          >
            <article
              class="board"
              @click="moveToBoard(board)"
              :style="
                board.style?.bgColor
                  ? { 'background-color': board.style?.bgColor }
                  : board.style?.imgUrl
                  ? {
                      'background-image': 'url( ' + board.style?.imgUrl + ')',
                      'background-size': 'cover',
                    }
                  : ''
              "
            >
              <div class="board-preview">
                <p class="board-preview-title">
                  {{ board.title }}
                </p>
                <img
                  class="yellow-star"
                  src="../assets/icons/star.png"
                  alt=""
                  v-if="board.isStarred"
                />
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <section class="board-section workspaces">
      <div class="workspaces-title">
        <h3>{{ titleUpperCase }}</h3>
      </div>
      <div>
        <ul class="board-list">
          <li v-for="board in boards" :key="board._id" class="board-li">
            <article
              class="board"
              @click="moveToBoard(board)"
              :style="
                board.style?.bgColor
                  ? { 'background-color': board.style?.bgColor }
                  : board.style?.imgUrl
                  ? {
                      'background-image': 'url( ' + board.style?.imgUrl + ')',
                      'background-size': 'cover',
                    }
                  : ''
              "
            >
              <div class="board-preview">
                <p class="board-preview-title">
                  {{ board.title }}
                </p>
                <img
                  class="yellow-star"
                  src="../assets/icons/star.png"
                  alt=""
                  v-if="board.isStarred"
                />
              </div>
            </article>
          </li>
          <Popper
            class="popper-create"
            placement="right"
            @open:popper="toggleModal"
            @close:popper="toggleModal"
          >
            <article class="create-board">
              <div class="create-board-preview">
                <p class="create-board-preview-title">Create new board</p>
              </div>
            </article>
            <template #content="{ close }">
              <createBoardPopperTemplateVue @closeModal="close" />
            </template>
          </Popper>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board.service.js";
// import { getActionRemoveBoard, getActionUpdateBoard, getActionAddBoardMsg } from '../store/board.store'
import boardDetails from "./board-details.vue";
import createBoardPopperTemplateVue from "../cmps/create-board-popper-template.vue";

export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
      listOfImgs: [],
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
    titleUpperCase() {
      return "Your Boards".toUpperCase();
    },
    starredBoards(){
      console.log(this.boards);
      return this.boards.filter(board=> board.isStarred)
    }
  },
  async created() {
    try {
      this.$store.dispatch({ type: "loadBoards" });
      const { boardId } = this.$route.params;
      if (boardId) {
        console.log("ok");
        const board = await this.$store.dispatch({
          type: "setCurrBoard",
          boardId,
        });
      }
    } catch (err) {
      console.log(err);
    }
    // this.currBoard = board;
    // this.currBoard = this.getCurrBoard;
    // const board = await boardService.getById(boardId);
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board: this.boardToAdd,
        });
        showSuccessMsg("Board added");
        this.boardToAdd = boardService.getEmptyBoard();
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add board");
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "removeBoard", boardId });
        showSuccessMsg("Board removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove board");
      }
    },
    async updateBoard(board) {
      try {
        board = { ...board };
        await this.$store.dispatch({ type: "updateBoard", board });
        showSuccessMsg("Board updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update board");
      }
    },
    // async addBoardMsg(boardId) {
    //   try {
    //     await this.$store.dispatch({type:"addBoard",boardId})
    //     showSuccessMsg('Board msg added')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add board msg')
    //   }
    // },

    printBoardToConsole(board) {
      console.log("Board msgs:", board.msgs);
    },
    moveToBoard(board) {
      this.$store.dispatch({ type: "setCurrBoard", boardId: board._id });
      this.$router.push(`/board/${board._id}`);
    },
  },

  components: {
    boardDetails,
    createBoardPopperTemplateVue,
  },
};
</script>
