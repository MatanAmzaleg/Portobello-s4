<template>
  <section class="task-preview" :style="{'background-color': item.task.style?.bgColor}" >
    <div class="labels">
      <span
        class="label"
        v-for="label in item.task?.labelIds"
        :style="{ 'background-color': labelColor(label) }"
      ></span>
    </div>
    <span class="task-router-link">{{ item.title }}</span>
    <div class="task-details">
    <span>{{item.task.description?.slice(0,50)}}</span>
     <mini-users :memberIds="item.task.memberIds" /> 
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
      const label =  this.$store.getters.currBoard.labels.find((l) => {
          return l.id === id
      })
      return label.color;
    },
    labelText(id) {
      const label =  this.$store.getters.currBoard.labels.find((l) => l.id === id);
      return label.title;
    },
  },
  computed: {
      currBoard() {
          this.$store.getters.currBoard
      }
  },
  components:{
    miniUsers
  }
};
</script>
