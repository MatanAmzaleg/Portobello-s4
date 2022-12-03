<template>
  <section class="task-list">
    <Container
      class="flex-grow overflow-y-auto overflow-x-hidden task-list"
      orientation="vertical"
      group-name="col-items"
      :shouldAcceptDrop="
        (e, payload) => e.groupName === 'col-items' && !payload.loading
      "
      :get-child-payload="getCardPayload(column.id)"
      :drop-placeholder="{
        className: `bg-primary bg-opacity-20  
              border-dotted border-2 
              border-primary mx-4 my-2`,
        animationDuration: '200',
        showOnTop: true,
      }"
      drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
      drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
      @drop="(e) => onCardDrop(column.id, e)"
    >
      <!-- Items -->
      <Draggable
        @click="goToTask(item.id)"
        v-for="item in column.tasks"
        :key="item.id"
        :item="item"
        class="task rotate-6"
      >
        <task-preview :item="item"></task-preview>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { utilService } from "../services/util.service";
import taskPreview from "./task-preview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems, generateWords } from "../utils/helpers";

export default {
  name: "task-list",
  props: {
    column: Object,
    currBoard: Object,
    scene: Object,
  },
  components: {
    Container,
    Draggable,
    taskPreview,
  },
  methods: {
    goToTask(taskId) {
      this.$router.push(`${this.currBoard._id}/task/${taskId}`);
    },
    onCardDrop(columnId, dropResult) {
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.groups.filter((p) => p.id === columnId)[0];
        const itemIndex = scene.groups.indexOf(column);
        const newColumn = Object.assign({}, column);
        // check if element was ADDED in current column
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          dropResult.payload.loading = true;
          // simulate api call
          setTimeout(function () {
            dropResult.payload.loading = false;
          }, Math.random() * 5000 + 1000);
        }
        newColumn.tasks = applyDrag(newColumn.tasks, dropResult);
        scene.groups.splice(itemIndex, 1, newColumn);
        this.newScene = scene;
        let board = utilService.createBoardFromScene(this.scene);
        board = { ...this.currBoard, groups: board.groups };
        this.$emit("addBoard", board);
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.groups.filter((p) => p.id === columnId)[0].tasks[
          index
        ];
      };
    },
  },
};
</script>
