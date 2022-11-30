<template>
  <board-header :board="board"></board-header>
  <section v-if="currBoard" class="board-details">
<<<<<<< HEAD
    <group-list :currBoard="currBoard"></group-list>
=======
    <Container
      class="group-container"
      group-name="cols"
      tag="div"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
    >
      <Draggable v-for="column in scene.groups" :key="column.id">
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
              v-for="item in column.tasks"
              :key="item.id"
              :item="item"
              class="task"
            >
              <router-link
                :to="`/g/${column.id}/t/${item.id}`"
                >{{ item.name }}</router-link
              >
            </draggable>
            <button class="add-task-btn">+ Add a card</button>
          </Container>
        </div>
      </Draggable>
    </Container>
    
>>>>>>> fafefc162d8d99ed0fb0e275d7e57ea098961e16
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
<<<<<<< HEAD

    } catch {}
  },
  components: { boardHeader, groupList },
=======
      this.scene = {
        type: "container",
        props: {
          orientation: "horizontal",
        },
        groups: generateItems(this.currBoard.groups.length, (i) => ({
          id: `${this.currBoard.groups[i].id}`,
          type: "container",
          name: `${this.currBoard.groups[i].title}`,
          props: {
            orientation: "vertical",
          },
          tasks: generateItems(
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
  components: { Container, Draggable, taskDetails, boardHeader },
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.groups = applyDrag(scene.groups, dropResult);
      this.scene = scene;
      const board = this.createBoardFromScene;
      // this.$store.commit("addBoard", board);
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
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.groups.filter((p) => p.id === columnId)[0].tasks[
          index
        ];
      };
    },

    printScene() {
      console.log(this.scene);
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
>>>>>>> fafefc162d8d99ed0fb0e275d7e57ea098961e16
};
</script>
