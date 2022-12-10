<template>
  <div v-if="!isSearchMode" class="cover-reg-mode">
    <div class="popper-content cover-picker">
      <popperModal :title="titleMode" @closeModal="closeModal" ></popperModal>
      <div class="cover-section">
      <p class="mini-title1">Size</p>
        <div class="half-cover-container">
          <div @click="updateCoverMode('half')" class="cover-option"
            :class="currStyle?.mode === 'half' ? 'selected-cover' : ''">
            <div class="cover-color" :style="
              currStyle?.bgColor?.charAt(0) !== '#'
                ? {
                  'background-image': 'url(' + currStyle?.imgUrl + ')',
                  'background-size': 'cover',
                  'background-position': 'center',
                }
                : {
                  'background-color': currStyle?.bgColor || 'grey',
                }
            "></div>
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
          <div @click="updateCoverMode('full')" class="cover-option"
            :class="currStyle?.mode === 'full' ? 'selected-cover' : ''">
            <div class="cover-color all" :style="
              currStyle?.bgColor?.charAt(0) !== '#'
                ? {
                  'background-image': 'url(' + currStyle?.imgUrl + ')',
                  'background-size': 'cover',
                  'background-position': 'center',
                }
                : {
                  'background-color': currStyle?.bgColor || 'grey',
                }
            ">
              <div class="cover-content-example all">
                <div class="line"></div>
                <div class="line line-2"></div>
              </div>
            </div>
          </div>
        </div>
        <button @click="removeCover" class="search-btn">
          Remove cover
        </button>
        <p class="mini-title1">Colors</p>
        <div class="colors">
          <span v-for="cover in covers" @click="setCover(cover.color)" class="cover-color"
            :class="currStyle?.bgColor === cover.color ? 'selected-cover' : ''"
            :style="{ 'background-color': cover.color }"></span>
        </div>
        <p class="mini-title1">Attachments</p>
        <label class="upload-btn"><input type="file" @change="uploadAttachment" hidden>Upload a cover image</label>
        <p class="mini-title1">Photos from unsplash</p>
        <div class="background-imgs">
          <span v-for="img in imgs" @click="setCover(img)" class="unsplash-img" :style="{
            'background-image': 'url(' + img + ')',
            'background-size': 'cover',
            'background-position': 'center',
          }" :class="currStyle?.imgUrl === img ? 'selected-cover' : ''">
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
        <input v-model="searchWord" @input="debounce(searchWord)" type="text" class="search-input"
          placeholder="Search Unsplash for photos" />
        <div v-if="!searchWord" class="under-input">
          <p class="mini-title1">Suggested searches</p>
          <button @click="sendApiReq(sug)" class="suggested-btn" v-for="sug in suggested">
            {{ sug }}
          </button>
          <p class="mini-title1">Top photos</p>
          <div class="background-imgs2">
            <span v-for="img in imgs2" @click="setCover(img)" class="unsplash-img2" :style="{
              'background-image': 'url(' + img + ')',
              'background-size': 'contain',
            }" :class="currStyle?.imgUrl === img ? 'selected-cover' : ''">
            </span>
          </div>
        </div>
        <div v-if="searchWord" class="results">
          <p class="mini-title1">Results</p>
          <div v-if="searchedImgs" class="background-imgs3">
            <span v-for="img in searchedImgs" @click="setCover(img)" class="unsplash-img3" :style="{
              'background-image': 'url(' + img + ')',
              'background-size': 'cover',
            }">
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button @click="isSearchMode = false" v-if="isSearchMode" class="return-btn">
    <font-awesome-icon class="return-icon" icon="fa-solid fa-chevron-left" />
  </button>
</template>
<script>
import popperModal from "./popper-modal.vue";
import { utilService } from "../services/util.service";
import { uploadService } from "../services/upload.service";
export default {
  props: {
    style: Object
  },
  emits: ["setCover","closeModal"],
  data() {
    return {
      currBoard: null,
      covers: null,
      isSearchMode: false,
      searchWord: "",
      searchedImgs: null,
      currCover: '#fff',
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
    this.currCover = this.style?.bgColor
    if (this.style?.bgColor) {
      this.$emit("setCover", { color: this.style.bgColor, mode: this.style.mode });
    } else if (this.style?.imgUrl) {
      this.$emit("setCover", { color: this.style?.imgUrl, mode: this.style.mode });
    }
  },
  methods: {
    setCover(color) {
      this.currCover = color;
      if (this.style.mode) {
        this.$emit("setCover", { color, mode: this.style.mode });
      } else {
        this.$emit("setCover", { color, mode: 'half' });
      }
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
    updateCoverMode(coverMode) {
      if (this.style?.bgColor) {
        this.$emit("setCover", { color: this.style?.bgColor, mode: coverMode });
      } else if (this.style?.imgUrl) {
        this.$emit("setCover", { color: this.style?.imgUrl, mode: coverMode });
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
    removeCover(){
      this.$emit("setCover", '');
    },
    async uploadAttachment(ev) {
      this.$notify({type:'success',title:'Uploading files'})
      try {
        const { secure_url } = await uploadService.uploadImg(ev)
        this.setCover(secure_url)
      }
      catch (err) {
        console.log(err)
      }
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
    currStyle() {
      return this.style
    }
  },
  components: {
    popperModal,
  },
};
</script>
<style lang="">
    
</style>