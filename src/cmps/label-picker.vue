<template lang="">
  <Popper>
    <button>Labels</button>
    <template #content>
    <div class="label-picker">
      <h1>Labels</h1>
      <input type="search">
      <div class="labels">
      <small>Labels</small>
      <li v-for="label in labels">
      <div class="label">
        <label :style="{'background-color':label.color}"> {{label.title}}</label>
        <input type="checkbox" :style="{'background-color': label.color}">
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
        taskLabels: Array
    },
    created(){
        this.currLabels = this.taskLabels
    },
    data(){
        return{
            labels: [
                {
                    "title": "Manager task",
                    "color": "#61bd4f",
                    "id": "JsY1qR"
                },
                {
                    "title": "Low priority",
                    "color": "#f2d600",
                    "id": "d6cjhb"
                },
                {
                    "title": "Medium priority",
                    "color": "#ff9f1a",
                    "id": "YIQPhe"
                },
                {
                    "title": "High priority",
                    "color": "#eb5a46",
                    "id": "DNfXVp"
                },
                {
                    "title": "Bug",
                    "color": "#c377e0",
                    "id": "oKpZV4"
                },
                {
                    "title": "Adjustment",
                    "color": "#0079bf",
                    "id": "rZnFvJ"
                },
                {
                    "title": "Design",
                    "color": "#ff78cb",
                    "id": "kT8v8m"
                },
                {
                    "title": "Styles",
                    "color": "#b3bac5",
                    "id": "AYKlTC"
                }
            ],
            currLabels: [] 
        }
    }
}
</script>
<style lang="scss">
    .label-picker{
        padding: 20px;
        width: 200px;
        text-align: center;
        background-color: white;
        .labels{
            text-align: left;
            li{
                list-style: none;
                cursor: pointer;
            }
        }
    }
</style>