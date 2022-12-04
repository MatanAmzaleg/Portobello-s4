<template lang="">
    <Popper class="popper">
    <div class="task-option-btn">
      <font-awesome-icon class="icon" icon="fa-solid fa-tag" />
      <p>Checklist</p>
    </div>
      <template #content>
      <div class="popper-content label-picker">
        <popperModal title="Add Checklist" />
        <p>Title</p>
        <input class="task-popper-input" @input="onTitleChanged">
        <!-- <p>Copy items from...</p>
        <input class="task-popper-input" type="search"> -->
        <button @click="AddCheckList">Add</button>
      </div>
      </template>
    </Popper>
  </template>
<script>
import popperModal from './popper-modal.vue';
export default {
  props: {
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    onTitleChanged(ev) {
      this.title = ev.target.value
    },
    AddCheckList(){
      this.$emit('addchecklist', this.title)
    }
  },
  components: {
    popperModal
  }
}
</script>