<template>
  <section
    class="board-details"
    v-if="getCurrBoard"
    :style="{ 'background-color': getCurrBoard.style?.bgColor }"
  >
    <board-header
      @updateBoard="updateBoard"
      @setFilter="setFilter"
      :board="getCurrBoard"
    ></board-header>
    <section v-if="getCurrBoard" class="board-details">
      <group-list
        :filterBy="filterBy"
        @addTask="updateBoard"
        :currBoard="getCurrBoard"
      ></group-list>
      <router-view :currBoard="getCurrBoard"></router-view>
    </section>
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.vue";
import groupList from "../cmps/group-list.vue";
import { boardService } from "../services/board.service";

export default {
  name: "board-details",
  data() {
    return {
      filterBy: {},
      currBoard: null,
    };
  },
  async created() {
    try {
      const { boardId } = this.$route.params;
      this.$store.dispatch({type:"setCurrBoard", boardId})
      this.currBoard = this.getCurrBoard
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    setFilter(filterBy) {
      console.log(filterBy);
      this.filterBy = filterBy;
      const { txt } = filterBy;
      const regex = new RegExp(txt, "i");
      const filteredGroups = this.currBoard.groups.filter((group) =>
        regex.test(group.title)
      );
      const regBoard = this.getBoards.find((board) => {
        return board._id === this.$route.params.boardId;
      });
      console.log("🚀 ~ file: board-details.vue:69 ~ regBoard ~ this.$route.params.boardId", this.$route.params.boardId)
      console.log(regBoard);
      console.log(filteredGroups);
      this.currBoard = { ...regBoard, groups: filteredGroups };
      console.log(filteredGroups);
    },
    updateBoard(board) {
      console.log("updating board ");
      this.currBoard = board;
      this.$store.dispatch({
        type: "updateBoard",
        board,
      });
    },
  },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    },
  },
  components: { boardHeader, groupList },
};
</script>
