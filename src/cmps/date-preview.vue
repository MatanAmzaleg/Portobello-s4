<template lang="">
              <div class="task-date">
              <input @input="changeStatus" v-model="isDone" type="checkbox" class="checkbox-helper date-input" />
              <div class="task-option-btn">
              <p>{{date}}</p>
              <p class="task-status" :class="status">{{status}}</p>
              </div>
              </div>
</template>
<script>
export default {
    props:{
        dueDate:String,
        status: String,
    },
    created(){
        this.status === 'completed' ? this.isDone = true : this.isDone = false
    },
    data(){
        return{
            isDone:false,
        }
    },
    methods:{
        changeStatus(){
        let newStatus
           if(!this.isDone) newStatus = 'completed'
           else(newStatus === '')
           this.$emit('change-status',newStatus) 
        }
    },
    computed:{
        status(){
            const isoDate = new Date(this.dueDate);
            if(this.isDone) return 'completed'
            if(isoDate.getTime() - Date.now() >= 86349893) return null 
            if(isoDate.getTime() - Date.now() < 86349893 && isoDate.getTime() - Date.now() > 0) return 'due-soon' 
            return 'overdue'
        },
        date(){
            return new Date(this.dueDate).toLocaleTimeString()
        }
    }
}
</script>
<style lang="scss">
.task-status{
    font-size: 12px;
    color: white !important;
    line-height: 16px;
    padding: 0 4px;
    border-radius: 2px;
    margin: auto 0 auto 8px;
}
    .task-status.completed{
        background-color: #61BD4F;
    }
    .task-status.due-soon{
        background-color: #F2D600;
        color: #172b4d !important;
    }
    .task-status.overdue{
        background-color: #EB5A46;
    }
</style>