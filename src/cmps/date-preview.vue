<template lang="">
              <div class="task-date">
              <input @input="changeStatus" v-model="isDone" type="checkbox" class="checkbox-helper date-input" />
              <div class="task-option-btn">
              <p>{{date}}</p>
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
            isDone:'',
        }
    },
    methods:{
        changeStatus(){
        //    if(this.isDone) this.status = 'completed'
        //    if()
        //     this.$emit('saveStatus',this.isDone)
        }
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