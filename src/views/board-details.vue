<template>
  <section class="full-board flex" :class="{ 'is-menu-open': isMenuOpen }">
    <board-menu
      @updateBoard="updateBoard"
      :currBoard="getCurrBoard"
      @closeBoardMenu="closeBoardMenu"
    ></board-menu>
    <section
      class="board-details"
      v-if="getCurrBoard"
      :style="
        getCurrBoard.style?.bgColor
          ? { 'background-color': getCurrBoard.style?.bgColor }
          : getCurrBoard.style?.imgUrl
          ? {
              'background-image': 'url( ' + getCurrBoard.style?.imgUrl + ')',
              'background-size': 'cover',
            }
          : ''
      "
    >
      <board-header
        @openBoardMenu="openBoardMenu"
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
  </section>
</template>

<script>
import { utilService } from "../services/util.service";
import boardMenu from "../cmps/board-menu.vue";
import boardHeader from "../cmps/board-header.vue";
import groupList from "../cmps/group-list.vue";
import { eventBus } from "../services/event-bus.service";
import { socketService, SOCKET_EMIT_SEND_MSG } from '../services/socket.service'

export default {
  name: "board-details",
  data() {
    return {
      filterBy: { txt: "", labels: null },
      isMenuOpen: false,
      calculateColor: {},
    };
  },
  async created() {
    try {
      eventBus.on("toggleTask", this.updateTaskStatus);
      const { boardId } = this.$route.params;
      this.$store.dispatch({ type: "setCurrBoard", boardId });
      utilService.getCalculatedColor(this.getCurrBoard.style.imgUrl);
    } catch (err) {
      console.log(err);
    }
  },
  mounted() {
    if (this.getCurrBoard?.style.imgUrl) {
      utilService.getCalculatedColor(this.getCurrBoard.style.imgUrl);
    } else {
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
      this.$store.dispatch({
        type: "setCurrBoard",
        boardId: this.$route.params.boardId,
        filterBy,
      });
    },
    updateBoard(board) {
      this.currBoard = board;
      console.log('board test', board)
      this.$store.dispatch({
        type: "updateBoard",
        board,
      });
    },
    updateTaskStatus({ taskId, status }) {
      const taskStatus = status === "completed" ? "" : "completed";
      const newBoard = JSON.parse(JSON.stringify(this.getCurrBoard));
      let taskIdx;
      let groupIdx = newBoard.groups.findIndex((group) =>
        group.tasks.some((task, idx) => {
          if (task.id === taskId) taskIdx = idx;
          return task.id === taskId;
        })
      );
      newBoard.groups[groupIdx].tasks[taskIdx].status = taskStatus;
      this.updateBoard(newBoard);
    },
    openBoardMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeBoardMenu() {
      this.isMenuOpen = false;
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
  components: { boardHeader, groupList, boardMenu },
};
</script>
