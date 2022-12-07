<template>
  <Popper>
    <div class="task-option-btn">
      <span class="label-icon icon-actions"></span>
      <p>Labels</p>
    </div>
    <template #content="{close}">
      <popperLabel @updateBoard="onSaveLabel" @saveLabel="addLabel" :labelIds="this.labelIds" @closeModal="close"/>
    </template>
  </Popper>
</template>
<script>
import popperLabel from "./popper-label.vue";
export default {
  props: {
    labelIds: Array,
  },
  methods: {
    addLabel(labels) {
      this.$emit("save-label", labels);
    },
    onSaveLabel(board){
      this.$emit("updateBoard",board)
    },
    onDeleteLabel(){

    }
  },
  components: {
    popperLabel,
  },
};
</script>
<style lang="scss"></style>
