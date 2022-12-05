<template lang="">
              <div class="task-date">
              <el-checkbox class="checkbox date-input" size="large" />
              <div class="task-option-btn">
              <p>{{date}}</p>
              </div>
              </div>
</template>
<script>
export default {
    props:{
        dueDate:String
    },
    created(){
        console.log(this.dueDate);
    },
    computed:{
        date(){
            return new Date(this.dueDate).toLocaleDateString()
        }
    }
}
</script>
<style lang="">
    
</style>