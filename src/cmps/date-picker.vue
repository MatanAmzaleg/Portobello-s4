<template lang="">
    <Popper placement="top" offsetDistance="-100">
    <div class="task-option-btn">
      <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
      <p>Dates</p>
    </div>
      <template #content>
        <popper-calendar @removeDate="removeDate" @saveDate="saveDate"/>
      </template>
    </Popper>
</template>

  <script>
  import popperCalendar from './popper-calendar.vue'
  export default {
      props:{
          taskDate: String
      },
      methods:{
        saveDate(date){
          this.$emit('save-date',date)
        },
        removeDate(){
          this.$emit('remove-date')
        }
      },
      components:{
        popperCalendar
      }
  }
  </script>
  <style lang="scss">
    .date-picker{
      .el-button+.el-button {
    margin-left: 0px;
    margin-top: 5px;
}
      .save-btn, .remove-btn{
        width: 95%;
      }
    }
  </style>