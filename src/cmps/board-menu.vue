<template>
  <section class="board-menu">
    <div class="header">
      <h3 v-if="titleMode === 'menu'">Menu</h3>
      <h3 v-if="titleMode === 'changeBg'">Change background</h3>
      <h3 v-if="titleMode === 'unsplash'">Photos by Unsplash</h3>
      <h3 v-if="titleMode === 'colors'">Colors</h3>
      <h3 v-if="titleMode === 'more'">More</h3>
    </div>
    <hr />
    <section v-if="titleMode === 'menu'" class="main-content">
      <div class="menu-options">
        <div @click="titleMode = 'changeBg'" class="menu-opt">
          <div class="bg-trailer" :style="currBoard?.style?.bgColor? { 'background-color': currBoard?.style?.bgColor } : currBoard?.style?.imgUrl? {'background-image': 'url( ' + currBoard?.style?.imgUrl + ')','background-size': 'cover'} : ''">
          </div>
          <h4>Change background</h4>
        </div>
        <div class="menu-opt">
          <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
          <h4>More</h4>
        </div>
      </div>
      <hr />
      <div class="activity-section">
        <div class="menu-opt">
          <span class="activity-icon"></span>
          <h4>Activity</h4>
        </div>
      </div>
    </section>
    <section class="other-sections">
      <div v-if="titleMode === 'changeBg'" class="change-bg-section">
        <div class="main-container">
          <div @click="titleMode = 'unsplash'" class="unsplash-container">
            <img class="preview-img"
              src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg" alt="" />
            <p>Photos</p>
          </div>
          <div @click="titleMode = 'colors'" class="unsplash-container">
            <img class="preview-img" src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg"
              alt="" />
            <p>Photos</p>
          </div>
        </div>
      </div>

      <div v-if="titleMode === 'unsplash'" class="unsplash-section">
        <input v-model="searchWord" @input="debounce()" class="search-input" placeholder="Photos" type="text" />
        <div v-if="!searchedImgs" class="background-imgs">
          <span v-for="img in imgs" @click="setBoardBg(img)" class="unsplash-img" :style="{
            'background-image': 'url(' + img + ')',
            'background-size': 'cover',
          }">
          </span>
        </div>
        <div v-if="searchedImgs" class="background-imgs">
          <span v-for="img in searchedImgs" @click="setBoardBg(img)" class="unsplash-img" :style="{
            'background-image': 'url(' + img + ')',
            'background-size': 'cover',
          }">
          </span>
        </div>
      </div>
      <div v-if="titleMode === 'colors'" class="unsplash-section">
        <div class="background-imgs">
          <span v-for="cover in currBoard.covers" @click="setBoardCover(cover)" class="unsplash-img" :style="{
            'background-color': `${cover.color}`,
            'background-size': 'cover',
          }">
          </span>
        </div>
      </div>
      <button v-if="titleMode !== 'menu'" @click="(titleMode = 'menu'), (searchedImgs = null)" class="return-btn2">
        <font-awesome-icon class="return-icon" icon="fa-solid fa-chevron-left" />
      </button>
    </section>

    <button class="close-btn" @click="$emit('closeBoardMenu')">
      <font-awesome-icon class="close-add-task-btn" icon="fa-solid fa-xmark" />
    </button>
  </section>
</template>

<script>
import { utilService } from "../services/util.service";
export default {
  name: "board-menu",
  props: {
    currBoard: Object,
  },
  created() {
    this.debounce = utilService.debounce(this.sendApiReq);
  },
  data() {
    return {
      titleMode: "menu",
      searchedImgs: [],
      searchWord: "",
    };
  },
  methods: {
    async setBoardBg(url) {
      try {
        const newBoard = JSON.parse(JSON.stringify(this.currBoard));
        console.log('menu',url);
        newBoard.style = { imgUrl: url };
        const calcColor = await utilService.getCalculatedColor(newBoard.style.imgUrl);
        newBoard.style.calcColor = calcColor
        console.log('newBoard style', newBoard.style)
        this.$emit("updateBoard", newBoard);
      }catch(err){
        console.log(err)
      }
    },
    setBoardCover(cover) {
      const newBoard = JSON.parse(JSON.stringify(this.currBoard));
      console.log(newBoard);
      newBoard.style = { bgColor: cover.color };
      this.$emit("updateBoard", newBoard);
    },
    async sendApiReq() {
      if (!this.searchWord) {
        this.searchedImgs = null;
        return;
      }
      await utilService.fetchListOfPhotos(this.searchWord);
      this.searchedImgs = utilService.getImgs(this.searchWord).slice(0, 14);
      console.log(this.searchedImgs);
    },
  },
  computed: {
    imgs() {
      let background = [];
      if (utilService.getImgs("random")) {
        background = utilService.getImgs("random").slice(0, 14);
      }
      return background;
    },
  },
};
</script>