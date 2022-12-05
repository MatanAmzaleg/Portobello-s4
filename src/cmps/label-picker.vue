<template lang="">
  <Popper>
  <div class="task-option-btn">
    <font-awesome-icon class="icon" icon="fa-solid fa-tag" />
    <p>Labels</p>
  </div>
    <template :show="showPopper" #content>
    <div class="popper-content label-picker">
      <popperModal title="Labels" />
      <input class="search-input" placeholder="Search labels..." type="search">
      <div class="labels">
      <p class="labels-title">Labels</p>
      <li v-for="label in labels">
      <div class="label">
        <input class="checkbox" :checked="checkLabel(label.id)" @input="addLabel(label.id)" type="checkbox">
        <label class="label-color" :style="{'background-color':label.color}"></label>
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
    methods:{
        addLabel(labelId){
          let labelIdx = this.labelIds.findIndex(id => id === labelId)
          if(labelIdx === -1){
            this.labelIds.push(labelId)
          }
          else{
            this.labelIds.splice(labelIdx,1)  
          }
          this.$emit('save-label',this.labelIds)
        },
        checkLabel(id){
          return this.labelIds?.includes(id)
        }
    },
    components:{
      popperModal
    },
    data(){
        return{
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
        }
    }
}
</script>
<style lang="scss">
   
</style>