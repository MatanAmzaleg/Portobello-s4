<template>
      <div v-if="!isSearchMode" class="cover-reg-mode">
        <div class="popper-content cover-picker">
          <popperModal :title="titleMode" @closeModal="closeModal"></popperModal>
          <div class="cover-section">
            <div class="half-cover-container">
              <div
                @click="updateCoverMode('half', currCover)"
                class="cover-option"
                :class="this.style?.mode === 'half' ? 'selected-cover' : ''"

              >
                <div
                  class="cover-color"
                  :style="
                    currCover.charAt(0) !== '#'
                      ? {
                          'background-image': 'url(' + currCover + ')',
                          'background-size': 'cover',
                          'background-position': 'center',
                        }
                      : {
                          'background-color':  this.style?.bgColor || currCover,
                        }
                  "
                ></div>
                <div class="cover-content-example">
                  <div class="line"></div>
                  <div class="line line-2"></div>
                  <div class="line-3">
                    <div class="part"></div>
                    <div class="part"></div>
                  </div>
                  <div class="circle"></div>
                </div>
              </div>
              <div
                @click="updateCoverMode('full', currCover)"
                class="cover-option"
                :class="this.style?.mode === 'full' ? 'selected-cover' : ''"

              >
                <div
                  class="cover-color all"
                  :style="
                    currCover.charAt(0) !== '#'
                      ? {
                          'background-image': 'url(' + currCover + ')',
                          'background-size': 'cover',
                          'background-position': 'center',
                        }
                      : {
                          'background-color': this.style?.bgColor || currCover,
                        }
                  "
                >
                  <div class="cover-content-example all">
                    <div class="line"></div>
                    <div class="line line-2"></div>
                  </div>
                </div>
              </div>
            </div>
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
                @click="setCover(img)"
                class="unsplash-img"
                :style="{
                  'background-image': 'url(' + img + ')',
                  'background-size': 'cover',
                  'background-position': 'center',
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
          <popper-modal
            title="Photo search"
            @closeModal="restartParam(close)"
          ></popper-modal>
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
                  @click="setCover(img)"
                  class="unsplash-img2"
                  :style="{
                    'background-image': 'url(' + img + ')',
                    'background-size': 'contain',
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
                  @click="setCover(img)"
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
<script>
import popperModal from "./popper-modal.vue";
import { utilService } from "../services/util.service";
export default {
  props:{
    style: Object
  },
  data() {
    return {
      currBoard: null,
      covers: null,
      isSearchMode: false,
      searchWord: "",
      searchedImgs: null,
      currCover:'#fff',
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
    this.debounce = utilService.debounce(this.sendApiReq);
    if(this.style?.bgColor){
        this.$emit("setCover",this.style.bgColor, 'half');
      }
  },
  methods: {
    setCover(color) {
      console.log(this.style.mode)
      this.currCover = color;
      this.$emit("setCover", color,this.style.mode);
    },
    async sendApiReq(sug = "") {
      console.log("🚀 ~ file: cover.picker.vue:144 ~ sendApiReq ~ sug", sug);
      if (sug) this.searchWord = sug;
      await utilService.fetchListOfPhotos(this.searchWord);
      this.searchedImgs = utilService.getImgs(this.searchWord).slice(0, 10);
    },
    restartParam(close) {
      close;
      this.searchedImgs = [];
      this.searchWord = "";
      this.isSearchMode = false;
    },
    updateCoverMode(coverMode, currCover) {
      this.$emit("setCover", currCover, coverMode);
    },
    closeModal() {
      this.$emit("closeModal");
    },
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
    titleMode() {
      if (!this.isSearchMode) return "cover";
      else if (this.searchWord) return "Photo search";
      else return "";
    },
  },
  components: {
    popperModal,
  },
};
</script>
<style lang="">
    
</style>