<template lang="">
  <div class="label-preview-container"> <div class="label-preview-header">Labels</div>
  <div class="labels-preview-list"> <span class="label-preview" v-for="id in labelIds"
  :style="{ 'background-color': labelColor(id) }"></span> </div> </div>
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
<style lang="scss">
.label-preview-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 100%;
  margin-left: 20px;
  margin-bottom: 10px;
  .label-preview-header {
    font-size: 12px;
  }
  .labels-preview-list {
    display: flex;
  }

  .label-preview {
    width: 16px;
    height: 32px;
    border-radius: 0.1875em;
    margin: 0 0.25em 0 0;
    padding: 0px 0.75em;
  }
}
</style>
