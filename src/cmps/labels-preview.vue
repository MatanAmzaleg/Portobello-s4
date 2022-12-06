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
      <popper>
      <button class="plus-btn"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus" /></button>
      <template #content>
        <popperLabel @updateBoard="onSaveLabel" @saveLabel="addLabel" :labelIds="this.labelIds" />      
      </template>
      </popper>

    </div>
  </div>
</template>
<script>
import popperLabel from './popper-label.vue';
export default {
  props: {
    labelIds: Array,
    currBoard: Object,
  },
  created() {},
  methods: {
    labelColor(id) {
      const label = this.currBoard.labels.find((l) => l.id === id);
      if (!label) return
      return label.color;
    },
    labelText(id) {
      const label = this.currBoard.labels.find((l) => l.id === id);
      if (!label) return
      return label.title;
    },
    addLabel(labels) {
      this.$emit("save-label", labels);
    },
    onSaveLabel(board){
      this.$emit("updateBoard",board)
    },
  },
  components:{
    popperLabel
  }
};
</script>
<style lang="scss"></style>
