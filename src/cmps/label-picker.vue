<template lang="">
  <Popper>
  <div class="task-option-btn">
    <font-awesome-icon  :style="{'height': 12+'px'}" icon="fa-solid fa-tag" />
    <button>Labels</button>
  </div>
    <template #content v-if="labelIds">
    <div class="popper-content label-picker">
      <popper-modal title="Labels" />
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
    .label-picker{
      color: var(--ds-text, #172b4d);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    background-color: var(--ds-surface-overlay, #ffffff);
    border-radius: 3px;
    box-shadow: var(--ds-shadow-overlay, 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08));
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
        text-align: center;
        .labels{
          text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
            ul{
                padding: 0;
                margin: 0;
            }
            li{
                list-style: none;
                cursor: pointer;
            }
            .label{
    position: relative;
    margin-bottom: 0;
    border-radius: 3px;
    padding: 3px 12px;
    max-width: 100%;
    min-width: 48px;
    height: 32px;
    // font-size: 14px;
    // font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
                display: flex;
                // align-items: center;
                // height: 30px;
                // gap: 12px;
                // flex-direction: row;
                label{
                    width: 200px;
                    margin-left: 12px;
                    margin-right: 12px;
                }
                input{
                    width: 17px;
                }
                .pen-btn{
                    margin-top: auto;
                    margin-bottom: auto;
                }
            }
        }
    }
</style>