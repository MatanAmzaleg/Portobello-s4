<template>
  <div class="popper-content date-picker"> 
    <v-date-picker class="date-picker"  mode="dateTime" is24hr locale="en" is-expanded v-model="date" />
    <!-- <Datepicker v-model="date" :is-24="true" inline auto-apply/> -->

    <button @click="saveDate" class="save-btn" type="primary">Save</button>
    <button @click="removeDate" class="remove-btn">Remove</button> 
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
<style lang="scss">

</style>
