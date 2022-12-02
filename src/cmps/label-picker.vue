<template lang="">
  <Popper>

  <div class="task-option-btn">
    <font-awesome-icon  :style="{'height': 12+'px'}" icon="fa-solid fa-tag" />
    <button>Labels</button>
  </div>
    <template #content>
    <div class="label-picker">
      <h1>Labels</h1>
      <input type="search">
      <div class="labels">
      <small>Labels</small>
      <li v-for="label in labels">
      <div class="label">
        <input @input="addLabel(label.id)" type="checkbox" :style="{'background-color': label.color}">
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
        }
    },
    data(){
        return{
            labels: [
  {
    title: "Manager task",
    color: "#61bd4f",
    id: "JsY1qR"
  },
  {
    title: "Low priority",
    color: "#f2d600",
    id: "d6cjhb"
  },
  {
    title: "Medium priority",
    color: "#ff9f1a",
    id: "YIQPhe"
  },
  {
    title: "High priority",
    color: "#eb5a46",
    id: "DNfXVp"
  },
  {
    title: "Bug",
    color: "#c377e0",
    id: "oKpZV4"
  },
  {
    title: "Adjustment",
    color: "#0079bf",
    id: "rZnFvJ"
  },
  {
    title: "Design",
    color: "#ff78cb",
    id: "kT8v8m"
  },
  {
    title: "Styles",
    color: "#b3bac5",
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
        border: 1px solid black;
        font-size: 14px;
        padding: 12px;
        width: 304px;
        text-align: center;
        background-color: white;
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
                display: flex;
                // align-items: center;
                height: 30px;
                gap: 12px;
                // flex-direction: row;
                label{
                    width: 210px;
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