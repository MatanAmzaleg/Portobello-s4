<template lang="">
    <div @click.stop="toggleTask()" class="task-preview-date task-status" :class="status">
        <span class="clock-icon"></span>
        <a>{{date}}</a>
    </div>
</template>
<script>
import dateFormat, { masks } from "dateformat";
export default {
    props:{
        date:Object,
        status:String
    },
    created(){
        console.log(this.date);
    },
    methods:{
        toggleTask(){
            console.log('hey');
        }
    },
    computed:{
        status(){
            const isoDate = new Date(this.date);
            if(this.status === 'completed') return 'completed'
            if(isoDate.getTime() - Date.now() >= 86349893) return 'regular' 
            if(isoDate.getTime() - Date.now() < 86349893 && isoDate.getTime() - Date.now() > 0) return 'due-soon' 
            return 'overdue'
        },
        date(){
            return dateFormat(new Date(this.date), "d mmm");
        }
    }
}
</script>
<style lang="scss">
    .task-preview-date{
        margin: 0;
        max-width: 64px;
    min-height: 20px;
    overflow: hidden;
    display: flex;
    justify-content:center ;
    align-items: center;
    padding: 2px;
    border-radius: 3px;
    &:hover{
    filter: contrast(80%);    
        .clock-icon:before {
    content: "\e919";
    }

    }
    a{
        margin-left: 2px;
        margin-bottom: 3px;
        font-size: 13px !important;
    }
    .clock-icon:before {
    content: "\e91b";
    }
    }
</style>