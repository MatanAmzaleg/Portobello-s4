<template>
  <section class="task-preview">
    <div class="cover" v-if="item.style?.bgColor" :style="{backgroundColor:item.style.bgColor}"></div>
    <div class="padded-section">

      <div class="labels" v-if="(item.labelIds?.length > 0)">
        <span
          class="label"
          v-for="label in item.labelIds"
          :style="{ 'background-color': labelColor(label) }"
          ></span>
      </div>
      <span class="task-router-link">{{ item.title }}</span>
      <div v-if="taskExtra(item)" class="task-preview-info">
      <span v-if="item.isWatched" class="watch-icon"></span>
      <span v-if="item.description?.length" class="description-icon"></span>
      <span v-if="item.attachments?.length" class="attachment-icon">{{item.attachments.length}}</span>
      <span v-if="item.checklists?.length" class="checklist-icon">{{getTodoStatus(item.checklists)}}</span>
      <mini-users :isHeader="true" v-if="item.memberIds" :memberIds="item.memberIds" />
      </div>
    </div>
  </section>
</template>
<script>
import miniUsers from './mini-users.vue';
export default {
  props: {
    item: Object,
  },
  created() {
    console.log(this.item);
  },
  methods: {
    labelColor(id) {
      console.log(id);
      const label =  this.$store.getters.currBoard.labels.find((l) => {
          return l.id === id
      })
      console.log(label);
      return label.color;
    },
    labelText(id) {
      const label =  this.$store.getters.currBoard.labels.find((l) => l.id === id);
      return label.title;
    },
    taskExtra(item){
     return (item.description?.length || item.attachments?.length || item.checklists?.length || item.memberIds?.length || item.isWatched)
    },
    getTodoStatus(checklists){
      console.log(checklists);
      if(!checklists.length) return
      let doneTasks = 0
      checklists.forEach(checklist =>{
          doneTasks += checklist.todos.filter(todo => todo.isDone).length
      })
      let allTasks = 0
      checklists.forEach(checklist => allTasks += checklist.todos.length)
      return `${doneTasks}/${allTasks}` 
    }
  },
  computed: {
      currBoard() {
          return this.$store.getters.currBoard
      },
  },
  components:{
    miniUsers
  }
};
</script>
