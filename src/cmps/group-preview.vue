<template>
  <section class="group-preview">
    <div class="group">
      <div class="group-title">
        <h2 class="text-lg">{{ column.title }}</h2>
        <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <!-- column -->
      <task-list @addBoard="addBoard"
        :scene="scene"
        :currBoard="currBoard"
        :column="column"
      ></task-list>
      <!-- <Container
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
      > -->
      <!-- Items -->
      <!-- <draggable
          @click="goToTask(item.id)"
          v-for="item in column.tasks"
          :key="item.id"
          :item="item"
          class="task rotate-6"
        >
          <span class="task-router-link">{{ item.title }}</span>
        </draggable>
      </Container> -->
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
import taskList from "./task-list.vue";
// import { applyDrag, generateItems, generateWords } from "../utils/helpers";
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
  components: { Container, Draggable, taskDetails, taskList },
  methods: {
    changeAddStatus(groupId) {
      this.currGroup = groupId;
    },
    addTask() {
      console.log(this.currGroup);
      if(!this.newTaskTxt) return
      const task = { title: this.newTaskTxt, id: utilService.makeId() };
      const board = JSON.parse(JSON.stringify(this.currBoard));
      console.log(board);
      const groupIdx = board.groups.findIndex(
        (group) => group.id === this.currGroup
      );
      console.log(groupIdx);
      board.groups[groupIdx].tasks.push(task);
      this.$emit("addTask", board);
      this.newTaskTxt = "";
    },
    addGroup() {
      const group = {
        title: this.newGroupTxt,
        id: utilService.makeId(),
        tasks: [],
      };
      const board = JSON.parse(JSON.stringify(this.currBoard));
      board.groups.push(group);
      this.$emit("add-Task", board);
      this.newGroupTxt = "";
    },
    addBoard(board){
      this.$emit("addBoard", board);
    }
  },

};
</script>
