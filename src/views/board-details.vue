<template >
  <section class="board-details" v-if="getCurrBoard">
    <board-header @setFilter="setFilter" :board="getCurrBoard"></board-header>
    <section v-if="getCurrBoard" class="board-details">
      <group-list
        :filterBy="filterBy"
        @addTask="addTask"
        :currBoard="getCurrBoard"
      ></group-list>
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
    };
  },
  async created() {
    try {
      const { boardId } = this.$route.params;
      // const board = await boardService.getById(boardId);
      // this.currBoard = board;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    addTask(board) {
      console.log(board)
      this.$store.dispatch({
        type: "addBoard",
        board: JSON.parse(JSON.stringify(board)),
      });
    },
    setFilter(filterBy) {
      console.log(filterBy);
      this.filterBy = filterBy;
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      console.log(this.$store.getters.currBoard);
      return this.$store.getters.currBoard;
    },
  },
  components: { boardHeader, groupList },
};
</script>
