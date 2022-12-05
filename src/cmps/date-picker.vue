<template lang="">
    <Popper placement="top" offsetDistance="-100">
    <div class="task-option-btn">
      <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
      <p>Date</p>
    </div>
      <template #content>
      <div class="popper-content label-picker date-picker">
      <popper-modal title="Date" />
      <v-date-picker mode="dateTime" is24hr locale="en" is-expanded v-model="date" />
      <el-button @click="saveDate" class=" save-btn" type="primary">Save</el-button>
      <el-button @click="removeDate"  class="remove-btn">Remove</el-button>
      </div>
      </template>
    </Popper>
</template>

  <script>
import popperModal from './popper-modal.vue';
  export default {
      props:{
          taskDate: String
      },
      created(){
      this.date = this.getTask
      },
      data(){
          return{
              date:'',
          }    
      },
      methods:{
        saveDate(){
          this.$emit('save-date',this.date)
        },
        removeDate(){
          this.$emit('remove-date')
        }
      },
      computed:{
        getTask(){
          return this.$store.getters.currTask 
        }
      },
      watch:{
        getTask(newTask,oldTask){
          this.date = newTask.dueDate
        }
      },
      components:{
        popperModal
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