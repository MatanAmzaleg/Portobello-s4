<template>
  <section class="group-list">
    <Container
      class="group-container h-full overflow-x-auto"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
    >
      <Draggable v-for="column in scene.groups" :key="column.id">
        <group-preview
          @addTask="addTask"
          @addBoard="addBoard"
          :scene="scene"
          :currBoard="currBoard"
          :column="column"
          >helo</group-preview
        >
      </Draggable>
      <article class="add-group">
        <button
          class="add-group-btn"
          v-if="!isAddNewGroup"
          @click="isAddNewGroup = true"
        >
          <font-awesome-icon class="add-task-icon2" icon="fa-solid fa-plus" />
          Add another list
        </button>
        <input
          v-model="newGroupTxt"
          v-if="isAddNewGroup"
          class="add-group-input"
          placeholder="Enter list title..."
          type="text"
        />
        <div class="card-composure flex">
          <div class="pressed-buttons">
            <button @click="addGroup" v-if="isAddNewGroup" class="add-card-btn">
              Add list
            </button>
            <button v-if="isAddNewGroup" @click="isAddNewGroup = false">
              <font-awesome-icon
                class="close-add-task-btn"
                icon="fa-solid fa-xmark"
              />
            </button>
          </div>
        </div>
      </article>
    </Container>
  </section>
</template>

<script>
import { utilService } from "../services/util.service";
import groupPreview from "./group-preview.vue";
import taskDetails from "../views/task-details.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems, generateWords } from "../utils/helpers";
export default {
  name: "group-list",
  data() {
    return {
      scene: null,
      currGroup: null,
      newTaskTxt: "",
      isAddNewGroup: false,
      newGroupTxt: "",
    };
  },
  props: {
    currBoard: Object,
  },
  async created() {
    try {
      this.makeScene();
    } catch {}
  },
  components: { Container, Draggable, taskDetails, groupPreview },
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.groups = applyDrag(scene.groups, dropResult);
      this.scene = scene;
      let board = utilService.createBoardFromScene(this.scene);
      board = { ...this.currBoard, groups: board.groups };
      this.$store.dispatch({ type: "updateBoard", board });
    },
    addBoard(board) {
      this.$store.dispatch({ type: "addBoard", board });
    },
    addTask(board) {
      this.$emit("addTask", board);
    },
    addGroup() {
      const group = {
        title: this.newGroupTxt,
        id: utilService.makeId(),
        tasks: [],
      };
      const board = JSON.parse(JSON.stringify(this.currBoard));
      board.groups.push(group);
      console.log(this.$store.getters.currBoard);
      this.$emit("addTask", board);
      this.newGroupTxt = "";
    },
    makeScene() {
      this.scene = {
        type: "container",
        props: {
          orientation: "horizontal",
        },
        groups: generateItems(this.currBoard.groups.length, (i) => ({
          id: `${this.currBoard.groups[i].id}`,
          type: "container",
          title: `${this.currBoard.groups[i].title}`,
          props: {
            orientation: "vertical",
          },
          tasks: generateItems(this.currBoard.groups[i].tasks.length, (j) => ({
            type: "draggable",
            id: `${this.currBoard.groups[i].tasks[j].id}`,
            loading: false,
            title: `${this.currBoard.groups[i].tasks[j].title}`,
            task: this.currBoard.groups[i].tasks[j],
          })),
        })),
      };
    },
  },
  watch: {
    currBoard(newBoard, oldBoard) {
      this.makeScene();
    },
  },
};
</script>
