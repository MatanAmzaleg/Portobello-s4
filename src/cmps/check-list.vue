<template lang="">
    <Popper>
    <div class="task-option-btn">
      <span class="checklist-icon icon-actions"></span>
      <p>Checklist</p>
    </div>
      <template #content="{close}">
      <div class="popper-content label-picker">
        <popperModal title="Add Checklist" @closeModal="close"/>
        <div class="content-container">
          <p>Title</p>
          <input class="task-popper-input" @input="onTitleChanged">
          <button @click="AddCheckList">Add</button>
        </div>
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