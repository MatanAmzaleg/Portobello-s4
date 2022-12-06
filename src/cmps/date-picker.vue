<template lang="">
    <Popper placement="top" offsetDistance="-100">
      <div class="task-option-btn">
        <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
        <p>Dates</p>
      </div>
      <template #content="{close}">
        <div class="popper-content label-picker date-picker"> 
        <popper-modal title="Dates" @closeModal="close"/>
        <popper-calendar @removeDate="removeDate" @saveDate="saveDate"/>
        </div>
      </template>
    </Popper>
</template>

<script>
import popperCalendar from './popper-calendar.vue'
import popperModal from "./popper-modal.vue";

export default {
  props: {
    taskDate: String
  },
  methods: {
    saveDate(date) {
      this.$emit('save-date', date)
    },
    removeDate() {
      this.$emit('remove-date')
    }
  },
  components: {
    popperCalendar,
    popperModal
  }
}
</script>
<style lang="scss">
.vc-highlights{
    background-color: #95A3B3 !important;
}

.date-picker {
  background-color: white;
  .el-button+.el-button {
    margin-left: 0px;
    margin-top: 5px;
  }

  .save-btn,
  .remove-btn {
    width: 95%;
  }
}
</style>