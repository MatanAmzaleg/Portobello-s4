<template>
  <section class="task-preview">
    <div class="cover" v-if="item.style" :style="{backgroundColor:item.style.bgColor}"></div>
    <div class="padded-section">

      <div class="labels" v-if="item.labelIds">
        <span
        class="label"
        v-for="label in item.labelIds"
        :style="{ 'background-color': labelColor(label) }"
        ></span>
      </div>
      <span class="task-router-link">{{ item.title }}</span>
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
