<template>
  <board-header :board="currBoard"></board-header>
  <section v-if="currBoard" class="board-details">
    <group-list @addTask="addTask" :currBoard="currBoard"></group-list>
    <router-view :currBoard="currBoard" ></router-view>
  </section>
</template>

<script>
import boardHeader from "../cmps/board-header.vue"
import groupList from "../cmps/group-list.vue"
import { boardService } from "../services/board.service"

export default {
  name: "board-details",
  data() {
    return {
    };
  },
  async created() {
      try {
        const { boardId } = this.$route.params;
        if (boardId) {
          this.$store.dispatch("setCurrBoard", boardId)
        } else this.currBoard = boardService.getEmptyBoard();
  
      } catch(err) {
        console.log(err);
      }
  },
  methods: {
    addTask(board){
      this.$store.dispatch({type:'addBoard', board:JSON.parse(JSON.stringify(board))})
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    currBoard(){
      return this.$store.getters.currBoard
    }
  },
  components: { boardHeader, groupList }
}
    
     
</script>
