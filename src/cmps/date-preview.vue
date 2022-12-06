<template lang="">
              <Popper class="date-preview-popper" placement="top" offsetDistance="-100">
              <div class="task-date">
              <input @click.stop @input="changeStatus" v-model="isDone" type="checkbox" class="checkbox-helper date-input" />
              <div class="task-option-btn large">
              <p>{{date}}</p>
              <p class="task-status" v-if="status" :class="status">{{status}}</p>
              </div>
              </div>
      <template #content="{close}">
        <div class="popper-content label-picker date-picker"> 
        <popper-modal title="Dates" @closeModal="close"/>
        <popper-calendar color="grey" @removeDate="removeDate" @saveDate="saveDate"/>
        </div>
      </template>
    </Popper>
</template>
<script>
import dateFormat, { masks } from "dateformat";
import popperCalendar from './popper-calendar.vue'
import popperModal from "./popper-modal.vue";
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
        },
        saveDate(date){
          this.$emit('save-date',date)
        },
        removeDate(){
          this.$emit('remove-date')
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
            return dateFormat(new Date(this.dueDate), "mmm dd 'at' HH:MM");
        }
    },
    components:{
        popperCalendar,
        popperModal
    }
}
</script>
<style lang="scss">
    .task-option-btn.large{
        width: max-content;
    }
    .date-preview-popper{
        width: fit-content;
    }
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
    .task-status.regular{
        color: #172b4d !important;
    }
</style>