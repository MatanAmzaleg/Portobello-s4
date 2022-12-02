<template lang="">
            <div class="label-preview-container">
              <div class="label-preview-header">Labels</div>
              <div class="labels-preview-list">
                <ul class="label-preview" v-for="labelId in labels">
                  <li :style="{ 'background-color': labelColor(labelId) }">
                    <!-- <p>{{ labelText(labelId) }}</p> -->
                  </li>
                </ul>
                </div>
</template>
<script>
export default {
    props:{
        labels:Array
    }
    
}
</script>
<style lang="">
    
</style>