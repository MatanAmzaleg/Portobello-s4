<template lang="">
 <div class="label-preview-container">
              <div class="label-preview-header">Labels</div>
              <div class="labels-preview-list">
                <ul class="label-preview" v-for="id in labelIds">
                  <li :style="{ 'background-color': labelColor(id) }">
                    <p>{{ labelText(id) }}</p>
                  </li>
                </ul>
                </div>
                </div>
</template>
<script>
export default {
  props: {
    labelIds: Object,
  },
  created(){
    // const boardLabels = this.$store.getters.currBoard.labels
    // console.log(boardLabels);
  },
  computed: {
    labelColor(id) {
      // console.log(id);
      // const boardLabels = this.$store.getters.currBoard.labels;
      // const label = boardLabels.find(l => l.id === id);
      // return label.color;
    },
    labelText(id) {
      // const boardLabels = this.$store.getters.currBoard.labels;
      // const label = boardLabels.find(l => l.id === id);
      // return label.txt;
    }
  },
};
</script>
<style lang="scss">
 .label-preview-container {
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-top: 15px;
    margin-left: 20px;
    // margin-bottom: em(15px);
    .label-preview-header {
      font-size: 12px;
      font-weight: 500;
      margin-top: 1.5px;
      // color: $clr12;
    }
    .labels-preview-list {
      display: flex;
      margin-top: 5px;
    }

    .label-preview {
      padding: 0;
      margin: 0;
      li {
        color: white;
        border-radius: 0.1875em;
        height: 1.9375em;
        line-height: 30px;
        margin: 0 0.25em 0.25em 0;
        padding: 0px 0.75em;
        width: auto;
        font-size: 15px;
      }
    }
  }
</style>
