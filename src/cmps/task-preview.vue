<template>
  <section class="task-preview">
    <div class="labels">
      <span
        class="label"
        v-for="label in item.task?.labelIds"
        :style="{ 'background-color': labelColor(label) }"
      ></span>
    </div>
    <span class="task-router-link">{{ item.title }}</span>
  </section>
</template>

<script>
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
        console.log(l.id);
          return l.id === id
      })
      console.log(label);
      return label.color;
    },
    labelText(id) {
      const label =  this.$store.getters.currBoard.labels.find((l) => l.id === id);
      return label.title;
    },
    computed: {
        currBoard() {
            this.$store.getters.currBoard
        }
    },
  },
};
</script>
