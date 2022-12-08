<template>
  <section class="group-preview">
    <div class="group">
      <div class="group-title">
        <span
          @input="changeGroupName(column)"
          contenteditable
          role="textbox"
          class="text-lg"
          ref="groupName"
          >{{ column.title }}</span
        >
        <popperEditOptions
          deleteTitle="Delete this list"
          requestedTitle="List actions"
          @delete="deleteGroup(column.id)"
        />
        <!-- <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" /> -->
      </div>
      <!-- column -->
      <task-list
        @addBoard="addBoard"
        :scene="scene"
        :currBoard="currBoard"
        :column="column"
      ></task-list>
      <textarea
        ref="taskArea"
        @keyup.enter="addTask"
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
import popperEditOptions from "./popper-edit-options.vue";
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
      newTaskTxt: " ",
      isAddNewGroup: false,
      newGroupTxt: " ",
    };
  },
  async created() {
    try {
      this.$store.dispatch({ type: "loadBoards" });
    } catch {}
  },
  components: {
    Container,
    Draggable,
    taskDetails,
    taskList,
    popperEditOptions,
  },
  methods: {
    changeAddStatus(groupId) {
      setTimeout(() => {
        this.$refs.taskArea.focus();
      }, 50);
      this.currGroup = groupId;
    },
    addTask() {
      if (this.newTaskTxt.trim(" ").length < 1) return;
      console.log(this.newTaskTxt.length);
      const board = JSON.parse(JSON.stringify(this.currBoard));
      const groupIdx = board.groups.findIndex(
        (group) => group.id === this.currGroup
      );
      let task = this.$store.getters.emptyTask;
      task.id = utilService.makeId();
      task.title = this.newTaskTxt;
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
    addBoard(board) {
      this.$emit("addBoard", board);
    },
    deleteGroup(groupId) {
      const board = JSON.parse(JSON.stringify(this.currBoard));
      let groupIdx = board.groups.findIndex((group) => group.id === groupId);
      board.groups.splice(groupIdx, 1);
      this.$store.dispatch({ type: "updateBoard", board });
    },
    changeGroupName(group){
      const updatedGroup = JSON.parse(JSON.stringify(this.column))
      updatedGroup.title = this.$refs.groupName.innerText;
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const groupIdx = board.groups.findIndex(g => g.id === updatedGroup.id)
      board.groups[groupIdx] = updatedGroup
      console.log(board);
      this.$store.dispatch({ type: "updateBoard", board });
      // console.log(newBoard);
      // console.log(this.column);

    }
  },
};
</script>
