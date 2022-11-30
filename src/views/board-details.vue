<template>
  <section v-if="currBoard" class="board-details">
    <Container
      class="group-container"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
    >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div class="group">
          <div class="group-title">
            <span class="text-lg">{{ column.name }}</span>
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
              v-for="item in column.children"
              :key="item.id"
              :item="item"
              class="task"
            >
            <router-link :to="`/board/${currBoard._id}/t/${item.id}`">{{ item.name }}</router-link>
            </draggable>
            <button class="add-task-btn">+ Add a card</button>
          </Container>
        </div>
      </Draggable>
    </Container>
  </section>

  <button @click="printScene">Print</button>
</template>

<script>
import taskDetails from "./task-details.vue";
import { boardService } from "../services/board.service";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems, generateWords } from "../utils/helpers";

export default {
  name: "board-details",
  data() {
    return {
      scene: null,
      currBoard: null,
    };
  },
  async created() {
    try {
      const { id } = this.$route.params;
      if (id) {
        const board = await boardService.getById(id);
        this.currBoard = board;
      } else this.boardToEdit = boardService.getEmptyBoard();
      this.scene = {
        type: "container",
        props: {
          orientation: "horizontal",
        },
        children: generateItems(this.currBoard.groups.length, (i) => ({
          id: `${this.currBoard.groups[i].id}`,
          type: "container",
          name: `${this.currBoard.groups[i].title}`,
          props: {
            orientation: "vertical",
          },
          children: generateItems(
            this.currBoard.groups[i].tasks.length,
            (j) => ({
              type: "draggable",
              id: `${this.currBoard.groups[i].tasks[j].id}`,
              loading: false,
              name: `${this.currBoard.groups[i].tasks[j].title}`,
              data: generateWords(Math.random() * 12 + 2),
            })
          ),
        })),
      };
    } catch {}
  },
  components: { Container, Draggable , taskDetails},
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.scene = scene;
    },
    onCardDrop(columnId, dropResult) {
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter((p) => p.id === columnId)[0];
        const itemIndex = scene.children.indexOf(column);
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

        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(itemIndex, 1, newColumn);
        this.scene = scene;
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ];
      };
    },
    printScene() {
      console.log(this.scene);
    },
    // openTaskDetails(task){
    //   this.$router.push(`/board/${this.currBoard._id}/t/${task.id}`)
    //   console.log(task);
    // }
  },
};
</script>

<style lang="scss">
.group-container {
  display: flex;
  gap: 16px;
  margin: 15px 0px 8px;
  padding: 0px 0px 8px 16px;
}
.group {
  width: 272px;
  background-color: #ebecf0;
  border-radius: 3px;

  .group-title {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    span {
      padding-inline: 16px;
    }
  }
}

.group:not(:last-child) {
  margin-inline-end: 16px;
}

.task {
  background-color: #ffffff;
  word-wrap: break-word;
  clear: both;
  display: block;
  padding: 6px 8px 2px;
  margin: 0 8px 4px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 1px 2px 0px rgba(154, 154, 154, 0.75);
}

.add-task-btn {
  width: 80%;
  text-align: left;
  height: 100%;
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  border-radius: 3px;

  &:hover {
    background-color: #e2e2e4;
  }
}
</style>
