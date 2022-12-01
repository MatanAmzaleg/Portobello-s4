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
        console.log(this.labelIds,'1');
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
                    "color": "#D5EDD2",
                    "id": "JsY1qR"
                },
                {
                    "color": "#FAF3C0",
                    "id": "d6cjhb"
                },
                {
                    "color": "#FDE6C6",
                    "id": "YIQPhe"
                },
                {
                    "color": "#F6D3CE",
                    "id": "DNfXVp"
                },
                {
                    "color": "#EDDBF4",
                    "id": "oKpZV4"
                },
                {
                    "color": "#BCD9EA",
                    "id": "rZnFvJ"
                },
                {
                    "color": "#BDECF3",
                    "id": "kT8v8m"
                },
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