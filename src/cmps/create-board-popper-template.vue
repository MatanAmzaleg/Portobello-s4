<template>
  <div class="popper-content">
    <popperModalHeaderVue
      title="Create board"
      :hasBackBtn="false"
      @closeModal="closeModal"
      @closeMoreModal="closeMoreModal"
    />
    <div class="content">
      <div class="content-board-img">
        <div
          class="board-img"
          :style="
            selectedBackground?.bgColor
              ? { 'background-color': selectedBackground?.bgColor }
              : selectedBackground?.imgUrl
              ? {
                  'background-image':
                    'url( ' + selectedBackground?.imgUrl + ')',
                  'background-size': 'cover',
                }
              : ''
          "
        >
          <img
            src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
            alt=""
            role="presentation"
          />
        </div>
      </div>
      <div class="board-background">
        <label>Background</label>
        <div>
          <ul class="background-imgs">
            <li
              class="li-img"
              :style="{
                'background-image':
                  'url(' +
                  (selectedBackground.imgUrl
                    ? imgs.slice(1, 4).includes(selectedBackground.imgUrl)
                      ? imgs[0]
                      : selectedBackground.imgUrl
                    : imgs[0]) +
                  ')',
                'background-size': 'cover',
              }"
            >
              <button
                class="color-button"
                title="Custom image"
                @click="updateUrlImg(imgs[0])"
              >
                <span
                  class="background-span"
                  v-if="
                    !imgs.slice(1, 4).includes(selectedBackground.imgUrl) &&
                    selectedBackground.imgUrl
                  "
                >
                  <selectedSvg />
                </span>
              </button>
            </li>
            <li
              v-for="img in imgs.slice(1, 4)"
              class="li-img"
              :style="{
                'background-image': 'url(' + img + ')',
                'background-size': 'cover',
              }"
            >
              <button
                class="color-button"
                title="Custom image"
                @click="updateUrlImg(img)"
              >
                <span
                  class="background-span"
                  v-if="selectedBackground.imgUrl === img"
                >
                  <selectedSvg />
                </span>
              </button>
            </li>
          </ul>
          <ul>
            <li
              class="li-color"
              :style="{
                backgroundColor: selectedBackground.bgColor
                  ? colors
                      .slice(0, 5)
                      .find((clr) => clr.color === selectedBackground.bgColor)
                    ? colors[0].color
                    : selectedBackground.bgColor
                  : colors[0].color,
              }"
            >
              <button
                class="color-button"
                :title="
                  colors[0].name.charAt(0).toUpperCase() +
                  colors[0].name.slice(1)
                "
                @click="updateBgColor(colors[0])"
              >
                <span
                  class="background-span"
                  v-if="
                    !colors
                      .slice(1, 5)
                      .find(
                        (clr) => clr.color === selectedBackground.bgColor
                      ) && selectedBackground.bgColor
                  "
                >
                  <selectedSvg />
                </span>
              </button>
            </li>
            <li
              v-for="clr in colors.slice(1, colors.length - 4)"
              class="li-color"
              :style="{ backgroundColor: clr.color }"
            >
              <button
                class="color-button"
                :title="clr.name.charAt(0).toUpperCase() + clr.name.slice(1)"
                @click="updateBgColor(clr.color)"
              >
                <span
                  class="background-span"
                  v-if="selectedBackground.bgColor === clr.color"
                >
                  <selectedSvg />
                </span>
              </button>
            </li>
            <li class="li-color more">
              <Popper class="popper-create more" placement="right">
                <button>
                  <svg
                    width="100%"
                    height="13"
                    role="presentation"
                    focusable="false"
                    viewBox="0 1 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                      fill="#42526E"
                    ></path>
                  </svg>
                </button>
                <template #content="{ close }" style="position: absolute">
                  <popperModalHeaderVue
                    :title="
                      moreMode === 'none'
                        ? 'Board background'
                        : moreMode === 'photos'
                        ? 'Photos'
                        : 'Colors'
                    "
                    :hasBackBtn="moreMode === 'none' ? false : true"
                    @closeModal="close"
                    @back="updatemoreMode('none')"
                  />
                  <div
                    v-if="moreMode === 'none'"
                    class="board-background board-background-more"
                  >
                    <div class="background-more-title">
                      <label>Photos</label>
                      <label class="more-btn" @click="updatemoreMode('photos')"
                        >See more</label
                      >
                    </div>
                    <ul class="background-imgs">
                      <li
                        v-for="img in imgs.slice(0, 6)"
                        class="li-imgs-wrap"
                        :style="{
                          'background-image': 'url(' + img + ')',
                          'background-size': 'cover',
                        }"
                      >
                        <button
                          class="color-button"
                          title="Custom image"
                          @click="updateUrlImg(img)"
                        >
                          <span
                            class="background-span"
                            v-if="selectedBackground.imgUrl === img"
                          >
                            <selectedSvg />
                          </span>
                        </button>
                      </li>
                    </ul>
                    <div class="background-more-title">
                      <label>Colors</label>
                      <label class="more-btn" @click="updatemoreMode('colors')"
                        >See more</label
                      >
                    </div>
                    <ul class="background-colors">
                      <li
                        v-for="clr in colors.slice(0, 6)"
                        class="li-imgs-wrap"
                        :style="{ backgroundColor: clr.color }"
                      >
                        <button
                          class="color-button"
                          :title="
                            clr.name.charAt(0).toUpperCase() + clr.name.slice(1)
                          "
                          @click="updateBgColor(clr.color)"
                        >
                          <span
                            class="background-span"
                            v-if="selectedBackground.bgColor === clr.color"
                          >
                            <selectedSvg />
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div v-if="moreMode === 'photos'" class="cover-search-mode">
                    <div class="popper-content">
                      <div class="cover-section">
                        <input
                          v-model="searchWord"
                          @input="debounce(searchWord)"
                          type="text"
                          class="search-input"
                          placeholder="Search Unsplash for photos"
                        />
                        <div v-if="!searchWord" class="under-input">
                          <div class="background-imgs-grid">
                            <span
                              v-for="img in imgs2"
                              @click="updateUrlImg(img)"
                              class="unsplash-img2"
                              :style="{
                                'background-image': 'url(' + img + ')',
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
                              @click="updateUrlImg(img)"
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
                  <div v-if="moreMode === 'colors'" class="cover-search-mode">
                    <div class="popper-content">
                      <div class="cover-section">
                        <div class="under-input">
                          <div class="background-color-grid">
                            <span
                              v-for="color in colors"
                              @click="updateBgColor(color.color)"
                              class="unsplash-img2"
                              :style="{
                                'background-color': color.color,
                              }"
                            >
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </Popper>
            </li>
          </ul>
        </div>
      </div>
      <div class="board-title">
        <label>Board title <span>*</span></label>
        <input
          @keyup.enter="addBoard"
          ref="boardName"
          @input="updateBoardName"
        />
      </div>
      <div class="board-create">
        <button
          :class="boardTitle !== '' ? 'create-allowed' : 'create-not-allowed'"
          @click="addBoard"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import popperModalHeaderVue from "./popper-modal.vue";
import selectedSvg from "./selected-svg.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { utilService } from "../services/util.service";

export default {
  props: {
    isModalOpen: Boolean,
  },
  data() {
    return {
      colors: [
        {
          name: "blue",
          color: "#0079bf",
        },
        {
          name: "orange",
          color: "#d29034",
        },
        {
          name: "green",
          color: "#519839",
        },
        {
          name: "red",
          color: "#b04632",
        },
        {
          name: "purple",
          color: "#89609e",
        },
        {
          name: "pink",
          color: "#cd5a91",
        },
        {
          name: "light green",
          color: "#4bbf6b",
        },
        {
          name: "azure",
          color: "#00aecc",
        },
        {
          name: "grey",
          color: "#838c91",
        },
      ],
      // imgs: [
      //     {
      //         id: "1",
      //         src: "https://images.unsplash.com/photo-1669250740534-1e26fb77051d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
      //     },
      //     {
      //         id: "2",
      //         src: "https://images.unsplash.com/photo-1669123549422-22f62dee014d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
      //     },
      //     {
      //         id: "3",
      //         src: "https://images.unsplash.com/photo-1669327195331-cd47e0d5eef0?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
      //     },
      //     {
      //         id: "4",
      //         src: "https://images.unsplash.com/photo-1669327857374-43aaa93dec95?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
      //     }
      // ],
      boardTitle: "",
      selectedBackground: {
        imgUrl: null,
        bgColor: "#0079bf",
      },
      searchWord: "",
      searchedImgs: null,
      moreMode: "none",
    };
  },
  created() {
    this.debounce = utilService.debounce(this.sendApiReq);
  },
  computed: {
    imgs() {
      let background = [];
      if (utilService.getImgs("random")) {
        background = utilService.getImgs("random");
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
  },
  methods: {
    updateUrlImg(url) {
      this.selectedBackground.imgUrl = url;
      this.selectedBackground.bgColor = "";
    },
    updateBgColor(color) {
      this.selectedBackground.bgColor = color;
      this.selectedBackground.imgUrl = "";
    },
    updateBoardName(ev) {
      this.boardTitle = ev.target.value;
    },
    updatemoreMode(currModal) {
      console.log("currModal", currModal);
      this.moreMode = currModal;
    },
    async addBoard() {
      try {
        const board = {
          title: this.boardTitle,
          style: this.selectedBackground,
        };
        const newBoard = await this.$store.dispatch({
          type: "createNewBoard",
          board,
        });
        showSuccessMsg("Board added");
        this.$router.push(`/board/${newBoard._id}`);
        this.boardToAdd = boardService.getEmptyBoard();
        this.closeModal();
        if (this.selectedBackground.imgUrl !== "")
          utilService.getCalculatedColor(this.boardToAdd.style.imgUrl);
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add board");
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
    closeMoreModal() {
      this.selectedBackground.bgColor = "#0079bf";
      this.selectedBackground.imgUrl = null;
    },
    async sendApiReq(sug = "") {
      // console.log("🚀 ~ file: cover.picker.vue:144 ~ sendApiReq ~ sug", sug)
      if (sug) this.searchWord = sug;
      await utilService.fetchListOfPhotos(this.searchWord);
      this.searchedImgs = utilService.getImgs(this.searchWord).slice(0, 10);
    },
  },
  watch: {
    isModalOpen(newValue, old) {
      setTimeout(() => {
        this.$refs.boardName.focus();
      }, 100);
    },
  },
  components: {
    popperModalHeaderVue,
    selectedSvg,
  },
};
</script>
