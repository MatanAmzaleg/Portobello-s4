<template lang="">
  <Popper placement="auto">
    <div class="task-option-btn">
      <span class="card-cover-icon icon-actions"></span>
      <p>Cover</p>
    </div>
    <template #content="{ close }">
      <div class="popper-content cover-picker">
        <popper-modal title="Cover" @closeModal="close"></popper-modal>
        <div class="cover-section">
          <p class="mini-title1">Colors</p>
          <div class="colors">
            <span
              v-for="cover in covers"
              @click="setCover(cover.color)"
              class="cover-color"
              :style="{ 'background-color': cover.color }"
            ></span>
          </div>
          <p class="mini-title1">Attachments</p>
          <button class="upload-btn">Upload a cover image</button>
          <p class="mini-title1">Photos from unsplash</p>
          <div class="background-imgs">
            <span
              v-for="img in imgs"
              @click="setImgAsCover(img)"
              class="unsplash-img"
              :style="{
                'background-image': 'url(' + img + ')',
                'background-size': 'cover',
              }"
            >
            </span>
          </div>
        </div>
      </div>
    </template>
  </Popper>
</template>
<script>
import popperModal from "./popper-modal.vue";
import { utilService } from "../services/util.service";
export default {
  data() {
    return {
      currBoard: null,
      covers: null,
    };
  },
  created() {
    this.currBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    this.covers = this.currBoard.covers;
    console.log(this.covers);
  },
  methods: {
    setCover(color) {
      this.$emit("setCover", color);
    },
    setImgAsCover(img){
        this.$emit("setCover", img);
        console.log(img);
    }
  },
  computed: {
    imgs() {
      let background = [];
      if (utilService.getImgs()) {
        background = utilService.getImgs().slice(0, 6);
      }
      return background;
    },
  },
  components: {
    popperModal,
  },
};
</script>
<style lang="scss"></style>
