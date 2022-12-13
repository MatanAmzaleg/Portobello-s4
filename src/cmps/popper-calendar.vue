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
  props:{
    taskDate:Number
  },
  created() {
    this.date = this.taskDate
  },
  data() {
    return {
      date: '',
    }
  },
  methods: {
    saveDate() {
      const date = new Date(this.date).getTime()
      this.$emit("save-date", date);
      this.$emit("closeModal");
    },
    removeDate() {
      this.$emit("remove-date");
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  components: {
    popperModal
  }
}
</script>
<style lang="scss">

</style>
