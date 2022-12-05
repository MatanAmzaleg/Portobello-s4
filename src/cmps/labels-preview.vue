<template lang="">
  <div class="label-preview-container">
    <p class="label-preview-header">Labels</p>
    <div class="labels-preview-list">
      <span
        class="label-preview"
        v-for="id in labelIds"
        :style="{ 'background-color': labelColor(id) + '60' }"
      >
        <div
          class="circle"
          :style="{ 'background-color': labelColor(id) }"
        ></div
      ></span>
      <button class="plus-btn"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus" /></button>
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
