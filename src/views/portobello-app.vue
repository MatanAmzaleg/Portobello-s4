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
                <font-awesome-icon  v-if="board.isStarred" class="yellow-star" icon="fa-solid fa-star" @click.stop="removerStarred(board)"/>
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
                <font-awesome-icon  v-if="!board.isStarred" class="white-star" icon="fa-regular fa-star" @click.stop="addStarred(board)"/>
                <font-awesome-icon  v-if="board.isStarred" class="yellow-star" icon="fa-solid fa-star" @click.stop="removerStarred(board)"/>
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
                <font-awesome-icon  v-if="!board.isStarred" class="white-star" icon="fa-regular fa-star" @click.stop="addStarred(board)"/>
                <font-awesome-icon  v-if="board.isStarred" class="yellow-star" icon="fa-solid fa-star" @click.stop="removerStarred(board)"/>
              </div>
            </article>
          </li>
          <Popper
            class="popper-create"
            placement="right"
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
      return this.boards.filter(board=> board.isStarred)
    }
  },
  async created() {
    try {
      this.$store.dispatch({ type: "loadBoards" });
      const { boardId } = this.$route.params;
      if (boardId) {
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
        this.$notify({
          type: 'success',
          title: "Board added!",
        });
        this.boardToAdd = boardService.getEmptyBoard();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: "Could not add board!",
        });
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "removeBoard", boardId });
        showSuccessMsg("Board removed");
      } catch (err) {
        console.log(err);
        this.$notify({type:'error',title:'Could not remove board'})

      }
    },
    async updateBoard(board) {
      try {
        board = { ...board };
        await this.$store.dispatch({ type: "updateBoard", board });
        this.$notify({
          type: 'success',
          title: "Board updated!",
        });
      } catch (err) {
        this.$notify({
          type: 'error',
          title: "Could not update board!",
        });
      }
    },
    moveToBoard(board) {
      this.$store.dispatch({ type: "setCurrBoard", boardId: board._id });
      this.$router.push(`/board/${board._id}`);
    },
    addStarred(board) {
      const boardToUpdate = JSON.parse(JSON.stringify(board));
      boardToUpdate.isStarred = true;
      this.$store.dispatch({ type: "updateBoard", board: boardToUpdate });
    },
    removerStarred(board) {
      const boardToUpdate = JSON.parse(JSON.stringify(board));
      boardToUpdate.isStarred = false;
      this.$store.dispatch({ type: "updateBoard", board: boardToUpdate });
    },
  },
  components: {
    boardDetails,
    createBoardPopperTemplateVue,
  },
};
</script>
