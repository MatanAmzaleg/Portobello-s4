<template lang="">
  <Popper>
<div class="task-option-btn">
  <font-awesome-icon  :style="{'height': 12+'px'}" icon="fa-regular fa-image" />
  <button>Cover</button>
</div>
  <template #content>
  <div class="cover-picker">
    <h1>Cover</h1>
    <div class="colors">
    <small>Colors</small>
    <div class="covers" v-for="cover in covers">
      <div @click="setCover(cover.color)" class="cover-color" :style="{'background-color':cover.color}">XXXX </div>
    </div>
    </div>
  </div>
  </template>
</Popper>
</template>
<script>
export default {
    data(){
        return{
            covers:[
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
            ]
        }
    },
    methods:{
        setCover(color){
            this.$emit('set-cover',color)
        }
    }
    
}
</script>
<style lang="scss">
    .cover-picker{
        .covers{
            display: flex;
        }
        .cover{
            display: inline;
            width: 40px;
        }

    }
</style>