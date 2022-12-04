<template>
  <section
    class="board-details"
    v-if="getCurrBoard"
    :style="getCurrBoard.style?.bgColor? { 'background-color': getCurrBoard.style?.bgColor } : getCurrBoard.style?.imgUrl? { 'background-image': 'url( '+ getCurrBoard.style?.imgUrl +')', 'background-size': 'cover' } : ''"
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
      filterBy: {txt:'',
      labels: null,
    },
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
      this.$store.dispatch({type:"setCurrBoard", boardId:this.$route.params.boardId, filterBy})
    },       
  },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      console.log(this.$store.getters.currBoard)
      return this.$store.getters.currBoard;
    },
  },
  components: { boardHeader, groupList },
};
</script>
