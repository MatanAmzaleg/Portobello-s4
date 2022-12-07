<template>
    <Popper @open:popper="updateInputFocus">
    <div class="task-option-btn">
      <span class="checklist-icon icon-actions"></span>
      <p>Checklist</p>
    </div>
      <template #content="{close}">
      <div class="popper-content label-picker">
        <popperModal title="Add Checklist" @closeModal="close"/>
        <div class="content-container">
          <label>Title</label>
          <input ref="focusInput" class="task-popper-input" @input="onTitleChanged">
          <el-button class="add-save-btn add-save-btn2" @click="AddCheckList" type="primary">Add</el-button>
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
    },
    updateInputFocus() {
      setTimeout(() => {
        this.$refs.focusInput.focus();
      }, 50);
    }
  },
  components: {
    popperModal
  }
}
</script>