<template>
  <div class="popper-content date-picker">
    <popper-modal title="Dates" @closeModal="closeModal" />
    <v-date-picker class="date-picker" mode="dateTime" is24hr locale="en" is-expanded v-model="date" />
    <button @click="saveDate" class="save-btn" type="primary">Save</button>
    <button @click="removeDate" class="remove-btn">Remove</button>
  </div>
</template>

<script>
import popperModal from "./popper-modal.vue";

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
      this.$emit("closeModal");
    },
    removeDate() {
      this.$emit("remove-date");
    },
    closeModal() {
      this.$emit("closeModal");
    }
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
  components: {
    popperModal
  }
}
</script>
<style lang="scss">

</style>
