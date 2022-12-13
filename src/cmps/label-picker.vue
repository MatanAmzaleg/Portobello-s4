<template>
  <Popper @open:popper="addFocus"  offsetSkid="69" offsetDistance="5">
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
import { eventBus } from "../services/event-bus.service";
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
    addFocus() {
      eventBus.emit('update-focus')
    },
  },
  components: {
    popperLabel,
  },
};
</script>
<style lang="scss"></style>
