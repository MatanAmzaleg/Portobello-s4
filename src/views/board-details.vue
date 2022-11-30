<template>
  <board-header :board="board"></board-header>
  <section v-if="currBoard" class="board-details">
    <group-list :currBoard="currBoard"></group-list>
  </section>
  <router-view />
  <button @click="printScene">Print</button>
</template>

<script>
import boardHeader from "../cmps/board-header.vue";
import groupList from "../cmps/group-list.vue"
import { boardService } from "../services/board.service";

export default {
  name: "board-details",
  data() {
    return {
      scene: null,
      currBoard: null,
      isAddTask: false,
    };
  },
  async created() {
    try {
      const { boardId } = this.$route.params;
      if (boardId) {
        const board = await boardService.getById(boardId);
        this.currBoard = board;
      } else this.boardToEdit = boardService.getEmptyBoard();

    } catch {}
  },
  components: { boardHeader, groupList },
};
</script>
