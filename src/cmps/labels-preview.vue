<template lang="">
  <div class="label-preview-container">
    <p class="label-preview-header">Labels</p>
    <div class="labels-preview-list">
      <span
        class="label-preview"
        v-for="id in labelIds"
        :style="{ 'background-color': labelColor(id) }"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    labelIds: Array,
    currBoard: Object,
  },
  created() {},
  methods: {
    labelColor(id) {
      const label = this.currBoard.labels.find((l) => l.id === id);
      return label.color;
    },
    labelText(id) {
      const label = this.currBoard.labels.find((l) => l.id === id);
      return label.title;
    },
  },
};
</script>
<style lang="scss"></style>
