<template>
  <section class="left-slider">
    <div class="header flex">
      <div class="trello-icon flex">
        <h1>P</h1>
      </div>
      <div class="titles flex">
        <h3>Portobello workspace</h3>
        <p>Free</p>
      </div>
      <button class="left-arrow" @click="$emit('closeSliderMenu')">
        <font-awesome-icon class="left-arrow-icon" icon="fa-solid fa-angle-left" />
      </button>
    </div>
    <hr />
    <div class="first-section">
      <div @click="routeToBoardPage" class="boards flex">
        <font-awesome-icon class="icon" icon="fa-brands fa-trello" />
        <p>Boards</p>
      </div>
      <div class="boards members flex">
        <span class="member-icon"></span>
        <p>Members</p>
        <Popper :append-to-body="true" @open:popper="addFocus" placement="right" offsetSkid="176" offsetDistance="143">
          <div>
            <button class="plus">
              <font-awesome-icon class="icon-plus" icon="fa-solid fa-plus" />
            </button>
          </div>
          <template #content="{ close }">
            <div class="label-picker">
              <popperMember @closeModal="close" @addMember="addMember" :members="getCurrBoard?.members" />
            </div>
          </template>
        </Popper>
      </div>
    </div>
    <div class="your-boards-section">
      <div class="mini-header flex">
        <p>Your boards</p>
        <Popper :append-to-body="true" @open:popper="addFocus" placement="right" offsetSkid="200" offsetDistance="150">
          <div>
            <button class="plus">
          <font-awesome-icon class="icon-plus-bigger" icon="fa-solid fa-plus" />
        </button>
          </div>
          <template #content="{ close }">
            <createBoardPopperTemplate @closeModal="close" />
          </template>
        </Popper>
      </div>
      <ul class="nav-item-content">
        <li v-for="board in getBoards"
          :style="getCurrBoard?._id === board._id ? { 'background-color': 'rgba(208, 208, 208, 0.395)' } : { 'background-color': 'inherit' }">
          <div class="starred-board-container" @click="moveToBoard(board)">
            <img v-if="board.style?.imgUrl" class="style-container-left" :src="board.style?.imgUrl" alt="" />
            <div v-if="board.style?.bgColor" class="style-container-left"
              :style="{ 'background-color': board.style?.bgColor }" alt=""></div>
            <div class="board-name-container">
              <label class="title-1">{{ board.title }}</label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import createBoardPopperTemplate from './create-board-popper-template.vue';
import popperMember from './popper-member.vue';
import { eventBus } from "../services/event-bus.service";

export default {
  data() {
    return {
      boards: null,
      currBoard: null,
    }
  },
  async created() {
    await this.$store.dispatch({ type: 'loadBoards' })
    this.boards = this.getBoards
    this.currBoard = this.getCurrBoard
  },
  methods: {
    moveToBoard(board) {
      this.$store.dispatch({ type: "setCurrBoard", boardId: board._id });
      this.$router.push(`/board/${board._id}`);
    },
    routeToBoardPage() {
      this.$router.push('/board')
    },
    addFocus() {
      eventBus.emit('update-focus')
    },
  },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    }
  },
  components: {
    createBoardPopperTemplate,
    popperMember
  }
};
</script>
