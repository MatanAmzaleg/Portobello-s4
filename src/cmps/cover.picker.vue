<template lang="">
  <Popper>
<div class="task-option-btn">
    <font-awesome-icon class="icon" icon="fa-solid fa-palette" />
  <p>Cover</p>
</div>
  <template #content>
  <div class="popper-content cover-picker">
  <popper-modal title="Cover"></popper-modal>
    <small>Colors</small>
    <div class="colors">
      <span v-for="cover in covers" @click="setCover(cover.color)" class="cover-color" :style="{'background-color':cover.color}"></span>
    </div>
    <small>Attachments</small>
    <div>``
    </div>
    <small>Photos from unsplash</small>
  </div>
  </template>
</Popper>
</template>
<script>
import popperModal from './popper-modal.vue'; 
export default {
    data(){
        return{
            covers:[
                {
                    "color": "#D5EDD2",
                    "id": "JsY1qR"
                },
                {
                    "color": "#D5EDD2",
                    "id": "JsY1qR"
                },
                {
                    "color": "#D5EDD2",
                    "id": "JsY1qR"
                },
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
            this.$emit('setCover',color)
        }
    },
    components:{
        popperModal
    }
    
}
</script>
<style lang="scss">

</style>