<template>
  <section class="task-preview">
    <div
      class="cover"
      v-if="item.style?.bgColor"
      :style="{ backgroundColor: item.style.bgColor }"
    ></div>
    <div class="padded-section">
      <div class="labels" v-if="item.labelIds?.length > 0">
        <span
          class="label"
          v-for="label in item.labelIds"
          :style="{ 'background-color': labelColor(label) }"
        ></span>
      </div>
      <span class="task-router-link">{{ item.title }}</span>
      <div v-if="taskExtra(item)" class="task-preview-info">
      <div class="task-preview-content">
        <span v-if="item.isWatched" class="watch-icon"></span>
      <TaskDatePreview v-if="item.dueDate" :status="item.status" :date="item.dueDate" />
        <span v-if="item.description?.length" class="description-icon"></span>
        <span v-if="item.attachments" class="attachment-icon">{{
          item.attachments.length
        }}</span>
        <div class="task-preview-checklist" :class="isDone ? 'done' : ''">
        <span v-if="item.checklists?.length" class="checklist-icon">
          <span>{{getTodoStatus(item.checklists) }}</span>
        </span>
        </div>
      </div>
      <div class="task-preview-users">
        <mini-users
          :isHeader="true"
          v-if="item.memberIds"
          :memberIds="item.memberIds"
        />
      </div>
      </div>
    </div>
  </section>
</template>
<script>
import miniUsers from "./mini-users.vue";
import TaskDatePreview from "./task-date-preview.vue";
export default {
  props: {
    item: Object,
  },
  data(){
    return{
      isDone:null
    }
  },
  methods: {
    labelColor(id) {
      const label = this.$store.getters.currBoard.labels.find((l) => {
        return l.id === id;
      });
      return label.color;
    },
    labelText(id) {
      const label = this.$store.getters.currBoard.labels.find(
        (l) => l.id === id
      );
      return label.title;
    },
    taskExtra(item) {
      return (
        item.description?.length ||
        item.attachments?.length ||
        item.checklists?.length ||
        item.memberIds?.length ||
        item.isWatched
      );
    },
    getTodoStatus(checklists) {
      if (!checklists.length) return;
      let doneTasks = 0;
      checklists.forEach((checklist) => {
        doneTasks += checklist.todos.filter((todo) => todo.isDone).length;
      });
      let allTasks = 0;
      checklists.forEach((checklist) => (allTasks += checklist.todos.length));
      this.isDone = allTasks === doneTasks ? true : false
      return `${doneTasks}/${allTasks}`;
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  components:{
    miniUsers,
    TaskDatePreview
}
};
</script>
