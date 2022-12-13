<template>
  <Popper offsetSkid="69" offsetDistance="-120">
    <div class="task-option-btn">
      <span class="card-cover-icon icon-actions"></span>
      <p>Cover</p>
    </div>
    <template #content="{ close }" class="cover-container">
      <popperCover @closeModal="close" @setCover="setCover" :style="style" />
    </template>
  </Popper>
</template>
<script>
import popperCover from './popper-cover.vue';
export default {
  props:{
    style: Object
  },
  methods: {
    setCover(color) {
      this.currCover = color;
      this.$emit("setCover", color);
    },
    updateCoverMode(currCover, coverMode) {
      this.$emit("setCover", currCover, coverMode);
    },
  },
  components: {
    popperCover
  },
};
</script>
<style lang="scss"></style>
