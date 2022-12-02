<template >
  <section class="board-details" v-if="currBoard">
    <board-header @updateBoard="updateBoard" @setFilter="setFilter" :board="currBoard"></board-header>
    <section v-if="currBoard" class="board-details">
      <group-list
        :filterBy="filterBy"
        @addTask="addTask"
        :currBoard="currBoard"
      ></group-list>
      <router-view :currBoard="currBoard" ></router-view>
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
      currBoard:null,
    };
  },
  async created() {
    try {
      const { boardId } = this.$route.params;
      const board = await this.$store.dispatch({type:"setCurrBoard",boardId})
      this.currBoard = board;      
      // const board = await boardService.getById(boardId);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    addTask(board) {
      console.log(board)
      this.currBoard = board
     this.$store.dispatch({
        type: "addBoard",
        board,
      });
    },
    setFilter(filterBy) {
      console.log(filterBy);
      this.filterBy = filterBy;
    },
    updateBoard(board){
      console.log("updating board ");
      this.currBoard = board
      this.$store.dispatch({
        type: "updateBoard",
        board,
      });
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    },
  },
  components: { boardHeader, groupList },
};
</script>
