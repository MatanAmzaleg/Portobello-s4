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
        <div class="group">
          <div class="group-title">
            <h2 class="text-lg">{{ column.title }}</h2>
            <font-awesome-icon
              class="ellipsis-icon"
              icon="fa-solid fa-ellipsis"
            />
          </div>
          <!-- column -->
          <Container
            class="flex-grow overflow-y-auto overflow-x-hidden"
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
              <router-link
                class="task-router-link"
                :to="`${currBoard._id}/g/${column.id}/t/${item.id}`"
                >{{ item.title }}</router-link
              >
            </draggable>
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
                <font-awesome-icon
                  class="add-task-icon"
                  icon="fa-solid fa-plus"
                />
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
                <button
                  v-if="column.id === currGroup"
                  @click="currGroup = null"
                >
                  <font-awesome-icon
                    class="close-add-task-btn"
                    icon="fa-solid fa-xmark"
                  />
                </button>
              </div>
            </div>
          </Container>
        </div>
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
import groupPreview from "../cmps/group-preview.vue";
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
      this.$store.dispatch({ type: "loadBoards" });
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
            data: generateWords(Math.random() * 12 + 2),
          })),
        })),
      };
    } catch {}
  },
  components: { Container, Draggable, taskDetails, groupPreview },
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.groups = applyDrag(scene.groups, dropResult);
      this.scene = scene;
      const board = this.createBoardFromScene;
      this.$store.dispatch({ type: "addBoard", board });
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
        this.scene = scene;
        const board = this.createBoardFromScene;
        this.$store.dispatch({
          type: "addBoard",
          board: JSON.parse(JSON.stringify(board)),
        });
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

      this.$emit("add-Task", board);
    },
    addGroup() {
      console.log(this.newGroupTxt);
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
  },
  computed: {
    createBoardFromScene() {
      const scene = this.scene;
      delete scene.props, delete scene.type;
      scene.groups.forEach((group) => {
        delete group.props, delete group.type;
        group.tasks.forEach((task) => {
          delete task.loading, delete task.type, delete task.data;
        });
      });
      const currBoard = this.currBoard;
      const board = {
        title: currBoard.title,
        _id: currBoard._id,
        groups: scene.groups,
      };
      return board;
    },
  },
};
</script>
