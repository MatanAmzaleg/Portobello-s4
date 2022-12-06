<template lang="">
  <Popper placement="auto">
    <div class="task-option-btn">
      <span class="card-cover-icon icon-actions"></span>
      <p>Cover</p>
    </div>
    <template class="cover-container" #content="{ close }">
      <div v-if="!isSearchMode" class="cover-reg-mode">
        <div class="popper-content cover-picker">
          <popper-modal :title="titleMode" @closeModal="close"></popper-modal>
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
            <button @click="isSearchMode = true" class="search-btn">
              Search for photos
            </button>
          </div>
        </div>
      </div>
      <div v-if="isSearchMode" class="cover-search-mode">
        <div class="popper-content cover-picker">
          <popper-modal title="Photo search" @closeModal="restartParam(close)"></popper-modal>
          <div class="cover-section">
            <input
              v-model="searchWord"
              @input="debounce(searchWord)"
              type="text"
              class="search-input"
              placeholder="Search Unsplash for photos"
            />
            <div v-if="!searchWord" class="under-input">
              <p class="mini-title1">Suggested searches</p>
              <button
                @click="sendApiReq(sug)"
                class="suggested-btn"
                v-for="sug in suggested"
              >
                {{ sug }}
              </button>
              <p class="mini-title1">Top photos</p>
              <div class="background-imgs2">
                <span
                  v-for="img in imgs2"
                  @click="setImgAsCover(img)"
                  class="unsplash-img2"
                  :style="{
                    'background-image': 'url(' + img + ')',
                    'background-size': 'cover',
                  }"
                >
                </span>
              </div>
            </div>
            <div v-if="searchWord" class="results">
              <p class="mini-title1">Results</p>
              <div v-if="searchedImgs" class="background-imgs3">
                <span
                  v-for="img in searchedImgs"
                  @click="setImgAsCover(img)"
                  class="unsplash-img3"
                  :style="{
                    'background-image': 'url(' + img + ')',
                    'background-size': 'cover',
                  }"
                >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="isSearchMode = false"
        v-if="isSearchMode"
        class="return-btn"
      >
        <font-awesome-icon
          class="return-icon"
          icon="fa-solid fa-chevron-left"
        />
      </button>
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
      isSearchMode: false,
      searchWord: "",
      searchedImgs:null,
      suggested: [
        "Productivity",
        "Perspective",
        "Organization",
        "Colorful",
        "Nature",
        "Business",
        "Minimal",
        "Space",
        "Animals",
      ],
    };
  },
  created() {
    this.currBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    this.covers = this.currBoard.covers;
    this.debounce = utilService.debounce(this.sendApiReq)
  },
  methods: {
    setCover(color) {
      this.$emit("setCover", color);
    },
    setImgAsCover(img) {
      this.$emit("setCover", img);
    },
   async sendApiReq(sug = "") {
      console.log("🚀 ~ file: cover.picker.vue:144 ~ sendApiReq ~ sug", sug)
      if (sug) this.searchWord = sug;
     await utilService.fetchListOfPhotos(this.searchWord) ;
      this.searchedImgs = utilService.getImgs(this.searchWord).slice(0,10)
    },
    restartParam(close){
      close
      this.searchedImgs = []
      this.searchWord = ""
      this.isSearchMode = false
    }
  },
  computed: {
    imgs() {
      let background = [];
      if (utilService.getImgs("random")) {
        background = utilService.getImgs("random").slice(0, 6);
      }
      return background;
    },
    imgs2() {
      let background = [];
      if (utilService.getImgs("random")) {
        background = utilService.getImgs("random").slice(6, 18);
      }
      return background;
    },
    titleMode(){
      if(!this.isSearchMode) return "cover"
      else if (this.searchWord) return "Photo search"
      else return ""
    }
  },
  components: {
    popperModal,
  },
};
</script>
<style lang="scss"></style>
