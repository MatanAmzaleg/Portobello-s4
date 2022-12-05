<template lang="">
  <div class="popper-content label-picker date-picker"> 
    <v-date-picker mode="dateTime" is24hr locale="en" is-expanded v-model="date" />
    <el-button @click="saveDate" class=" save-btn" type="primary">Save</el-button>
    <el-button @click="removeDate" class="remove-btn">Remove</el-button> 
  </div>
</template>
<script>
export default {
  created() {
    this.date = this.getTask
  },
  data() {
    return {
      date: '',
    }
  },
  methods: {
    saveDate() {
      this.$emit("save-date", this.date);
    },
    removeDate() {
      this.$emit("remove-date");
    },
  },
  computed: {
    getTask() {
      return this.$store.getters.currTask;
    },
  },
  watch: {
    getTask(newTask, oldTask) {
      this.date = newTask.dueDate
    }
  },
};
</script>
<style lang=""></style>
