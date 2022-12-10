<template>
  <section class="left-slider">
    <div class="header flex">
      <div class="trello-icon flex">
        <h1>T</h1>
      </div>
      <div class="titles flex">
        <h3>Trello Workspace</h3>
        <p>Free</p>
      </div>
      <button class="left-arrow" @click="$emit('closeSliderMenu')">
        <font-awesome-icon
          class="left-arrow-icon"
          icon="fa-solid fa-angle-left"
        />
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
        <button class="plus">
          <font-awesome-icon class="icon-plus" icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="your-boards-section">
      <div class="mini-header flex">
        <p>Your boards</p>
        <button class="plus">
          <font-awesome-icon class="icon-plus-bigger" icon="fa-solid fa-plus" />
        </button>
      </div>
      <ul class="nav-item-content">
        <li v-for="board in getBoards" :style="getCurrBoard._id === board._id ? {'background-color' : 'rgba(208, 208, 208, 0.395)'} :  {'background-color' : 'inherit'}">
          <div class="starred-board-container" @click="moveToBoard(board)">
            <img
              v-if="board.style?.imgUrl"
              class="style-container"
              :src="board.style?.imgUrl"
              alt=""
            />
            <div
              v-if="board.style?.bgColor"
              class="style-container"
              :style="{ 'background-color': board.style?.bgColor }"
              alt=""
            ></div>
            <div class="board-name-container">
              <label class="title-1">{{ board.title }}</label>
            </div>
          </div>
        </li>
      </ul>
      <!-- PUT BOARD LIST HERE -->
    </div>
  </section>
</template>

<script>
export default {
    methods: {
        moveToBoard(board) {
      console.log("move board");
      this.$store.dispatch({ type: "setCurrBoard", boardId: board._id });
      this.$router.push(`/board/${board._id}`);
    },
    routeToBoardPage(){
        this.$router.push('/board')
    }
    },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getCurrBoard(){
        return this.$store.getters.currBoard;
    }
  },
};
</script>
