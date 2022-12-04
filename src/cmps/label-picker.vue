<template lang="">
  <Popper>
  <div class="task-option-btn">
    <font-awesome-icon class="icon" icon="fa-solid fa-tag" />
    <p>Labels</p>
  </div>
    <template :show="showPopper" #content v-if="labelIds">
    <div class="popper-content label-picker">
      <popperModal title="Labels" />
      <input type="search">
      <div class="labels">
      <small>Labels</small>
      <li v-for="label in labels">
      <div class="label">
        <input @input="addLabel(label.id)" type="checkbox">
        <label :style="{'background-color':label.color}"></label>
        <font-awesome-icon class="pen-btn" icon="fa-solid fa-pencil" />
      </div>
      </li>
      </div>
    </div>
    </template>
  </Popper>
</template>
<script>
import popperModal from './popper-modal.vue';

export default {
    props:{
       labelIds: Array
    },
    created(){
        this.taskLabelsIds = this.labelIds

    },
    methods:{
        addLabel(labelId){
          console.log(this.taskLabelsIds);
            this.taskLabelsIds.push(labelId)
            this.$emit('save-label',this.taskLabelsIds)
        },
        checkLabel(id){
          return false
        }
    },
    components:{
      popperModal
    },
    data(){
        return{
            showPopper:false,
            labels:[
  {
    title: "Manager task",
    color: "#7bc86c",
    id: "JsY1qR"
  },
  {
    title: "Low priority",
    color: "#faf3c0",
    id: "d6cjhb"
  },
  {
    title: "Medium priority",
    color: "#fce6c6",
    id: "YIQPhe"
  },
  {
    title: "High priority",
    color: "#f5d3ce",
    id: "DNfXVp"
  },
  {
    title: "Bug",
    color: "#eddbf4",
    id: "oKpZV4"
  },
  {
    title: "Adjustment",
    color: "#0079bf",
    id: "rZnFvJ"
  },
  {
    title: "Design",
    color: "#bcd9ea",
    id: "kT8v8m"
  },
  {
    title: "Styles",
    color: "#bdecf3",
    id: "AYKlTC"
  }
],
            labelIds: [
            ] 
        }
    }
}
</script>
<style lang="scss">
   
</style>