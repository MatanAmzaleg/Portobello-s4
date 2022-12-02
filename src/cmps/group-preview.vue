<template>
  <section class="group-preview">
    <div class="group">
      <div class="group-title">
        <h2 class="text-lg">{{ column.title }}</h2>
        <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <!-- column -->
      <Container
      v-if="column.tasks.length"
        class="flex-grow overflow-y-auto overflow-x-hidden task-list "
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
        <draggable
          v-for="item in column.tasks"
          :key="item.id"
          :item="item"
          class="task rotate-6"
        >
          <span @click="goToTask(item.id)" class="task-router-link">{{ item.title }}</span>
        </draggable>
      </Container>
      <textarea
        v-if="column.id === currGroup"
        class="textarea"
        placeholder="Enter a title for this card"
        cols="30"
        rows="3"
        v-model="newTaskTxt"
      ></textarea>
      <div class="card-composure flex">
        <button
          v-if="column.id !== currGroup"
          class="add-task-btn"
          @click="changeAddStatus(column.id)"
        >
          <font-awesome-icon class="add-task-icon" icon="fa-solid fa-plus" />
          Add a card
        </button>
        <div class="pressed-buttons">
          <button
            class="add-card-btn"
            v-if="column.id === currGroup"
            @click="addTask"
          >
            Add card
          </button>
          <button v-if="column.id === currGroup" @click="currGroup = null">
            <font-awesome-icon
              class="close-add-task-btn"
              icon="fa-solid fa-xmark"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../services/util.service";
import taskDetails from "../views/task-details.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems, generateWords } from "../utils/helpers";
export default {
  name: "group-preview",
  props: {
    column: Object,
    currBoard: Object,
    scene: Object,
  },
  data() {
    return {
      newScene: null,
      currGroup: null,
      newTaskTxt: "",
      isAddNewGroup: false,
      newGroupTxt: "",
    };
  },
  async created() {
    try {
      this.$store.dispatch({ type: "loadBoards" });
    } catch {}
  },
  components: { Container, Draggable, taskDetails },
  methods: {
    goToTask(taskId){
      this.$router.push(`${this.currBoard._id}/task/${taskId}`)
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
        const board = utilService.createBoardFromScene(scene);
        board._id = this.currBoard._id
        board.title = this.currBoard.title
        this.$emit("addBoard", board)
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.groups.filter((p) => p.id === columnId)[0].tasks[
          index
        ];
      };
    },
    changeAddStatus(groupId) {
      this.currGroup = groupId;
    },
    addTask() {
      console.log(this.currGroup);
      const task = { title: this.newTaskTxt, id: utilService.makeId() };
      const board = JSON.parse(JSON.stringify(this.currBoard));
      console.log(board);
      const groupIdx = board.groups.findIndex(
        (group) => group.id === this.currGroup
      );
      board.groups[groupIdx].tasks.push(task);
      this.$emit("addTask", board);
    },
    addGroup() {
      console.log(this.newGroupTxt);
      const group = {
        title: this.newGroupTxt,
        id: utilService.makeId(),
        tasks:[],
      };
      const board = JSON.parse(JSON.stringify(this.currBoard));
      board.groups.push(group);
      this.$emit("add-Task", board);
      this.newGroupTxt = "";
    },
  },
  computed: {
  },
};
</script>