<template>
  <section ref="scroll1" class="task-list" :class="currGroup ? 'task-list-open' : ''">
    <Container ref="scroll2" class="flex-grow overflow-y-auto overflow-x-hidden task-list task-list-scroll"
      :class="currGroup ? 'task-list-open' : ''" orientation="vertical" group-name="col-items" :shouldAcceptDrop="
        (e, payload) => e.groupName === 'col-items' && !payload.loading
      " :get-child-payload="getCardPayload(column.id)" :drop-placeholder="{
  className: `bg-primary bg-opacity-20  
                    border-dotted border-2 
                    border-primary mx-4 my-2`,
  animationDuration: '200',
  showOnTop: true,
}" drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110" drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90" @drop="(e) => onCardDrop(column.id, e)">
      <!-- Items -->
      <Draggable @click="goToTask(item.id)" v-for="item in column.tasks" :key="item.id" :item="item"
        class="task rotate-6">
        <task-preview :item="item"></task-preview>
      </Draggable>
      <textarea ref="taskArea" v-if="column.id === currGroup" @keyup.enter="addTask" class="textarea"
        placeholder="Enter a title for this card" cols="30" rows="3" v-model="newTaskTxt"></textarea>
      <div class="card-composure flex" v-if="column.id === currGroup">
        <div class="pressed-buttons">
          <button class="add-card-btn" @click="addTask">
            Add card
          </button>
          <button @click="closeAddTask">
            <font-awesome-icon class="close-add-task-btn" icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
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
    currGroup: String
  },
  data() {
    return {
      newTaskTxt: " ",
    }
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
    closeAddTask() {
      this.$emit('closeAddTask')
    },
    addTask(){
      console.log('addTask')
      this.$emit('addTask', this.newTaskTxt)
      this.newTaskTxt = ""
    }
  },
  watch: {
    currGroup(newVal, oldVal) {
      console.log('this.$refs', this.$refs)
      if (newVal) {
        setTimeout(() => {
          this.$refs.taskArea.focus();
        }, 50);
      }

      const el = this.$refs.scroll1;
      const el2= this.$refs.scroll2;
      console.log('el', el2)
      // console.log('el2', el2)

      if (el2) {
        // Use el.scrollIntoView() to instantly scroll to the element
        // el.scrollTop = el.scrollHeight
        setTimeout(() => {
          el2.scrollTop = el.scrollHeight
        },0)
        // el2.scrollIntoView({block: "end"});
      }
    }
  }
};
</script>
