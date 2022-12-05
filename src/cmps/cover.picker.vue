<template lang="">
  <Popper>
<div class="task-option-btn">
    <span class="card-cover-icon icon-actions"></span>
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
                    "color": "#7BC86C",
                    "id": "JsY1qR"
                },
                {
                    "color": "#F5DD29",
                    "id": "JsY1qR"
                },
                {
                    "color": "#FFAF3F",
                    "id": "JsY1qR"
                },
                {
                    "color": "#EF7564",
                    "id": "JsY1qR"
                },
                {
                    "color": "#CD8DE5",
                    "id": "d6cjhb"
                },
                {
                    "color": "#5BA4CF",
                    "id": "YIQPhe"
                },
                {
                    "color": "#29CCE5",
                    "id": "DNfXVp"
                },
                {
                    "color": "#6DECA9",
                    "id": "oKpZV4"
                },
                {
                    "color": "#FF8ED4",
                    "id": "rZnFvJ"
                },
                {
                    "color": "#172B4D",
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