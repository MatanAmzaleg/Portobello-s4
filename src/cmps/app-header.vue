<template>
  <header
    :style="{ 'background-color': getCalcColor?.calcColor }"
    class="app-header"
  >
    <nav>
      <section class="trello">
        <router-link to="/board">
          <button class="logo">
            <font-awesome-icon
              :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              class="icon"
              icon="fa-brands fa-trello"
            />
            <span
              class="title"
              :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              >Portobello</span
            >
          </button>
        </router-link>
        <section class="trello-actions">
          <Popper offsetSkid="110" class="popper-main">
            <button class="nav-item">
              <span :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                >Boards</span
              >
              <svg
                :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                width="18"
                height="18"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <template #content="{ close }">
              <div class="popper-template">
                <ul class="nav-item-content">
                  <li v-for="board in getBoards">
                    <div
                      class="starred-board-container"
                      @click="moveToBoard(board)"
                    >
                      <img
                        v-if="board.style?.imgUrl"
                        class="style-container"
                        :src="board.style?.imgUrl"
                        alt=""
                      />
                      <div
                        v-if="board.style?.bgColor"
                        class="style-container"
                        :style="{ 'background-color': board.style?.bgColor }"
                        alt=""
                      ></div>
                      <div class="board-name-container">
                        <label class="title-1">{{ board.title }}</label>
                        <label class="title-2">{{ board.title }} Board</label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Popper>
          <Popper offsetSkid="110" class="popper-main">
            <button class="nav-item">
              <span :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                >Recent</span
              >
              <svg
                :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                width="18"
                height="18"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <template #content="{ close }">
              <div class="popper-template">
                <ul class="nav-item-content">
                  <li v-for="board in getBoards.slice(0, 4)">
                    <div
                      class="starred-board-container"
                      @click="moveToBoard(board)"
                    >
                      <img
                        v-if="board.style?.imgUrl"
                        class="style-container"
                        :src="board.style?.imgUrl"
                        alt=""
                      />
                      <div
                        v-if="board.style?.bgColor"
                        class="style-container"
                        :style="{ 'background-color': board.style?.bgColor }"
                        alt=""
                      ></div>
                      <div class="board-name-container">
                        <label class="title-1">{{ board.title }}</label>
                        <label class="title-2">{{ board.title }} Board</label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Popper>
          <Popper offsetSkid="110" class="popper-main">
            <button class="nav-item">
              <span :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                >Starred</span
              >
              <svg
                :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                width="18"
                height="18"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <template #content="{ close }">
              <div class="popper-template">
                <ul class="nav-item-content">
                  <li
                    v-if="staredBoards"
                    v-for="board in getBoards?.filter(
                      (board) => board.isStarred
                    )"
                  >
                    <div
                      v-if="board.isStarred"
                      class="starred-board-container"
                      @click="moveToBoard(board)"
                    >
                      <img
                        v-if="board.style?.imgUrl"
                        class="style-container"
                        :src="board.style?.imgUrl"
                        alt=""
                      />
                      <div
                        v-if="board.style?.bgColor"
                        class="style-container"
                        :style="{ 'background-color': board.style?.bgColor }"
                        alt=""
                      ></div>
                      <div class="board-name-container">
                        <label class="title-1">{{ board.title }}</label>
                        <label class="title-2">{{ board.title }} Board</label>
                      </div>
                      <div
                        class="yellow-star-container"
                        @click.stop="removerStarred(board)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-star"
                          class="star yellow-star-full"
                        />
                        <font-awesome-icon
                          icon="fa-regular fa-star"
                          class="star yellow-star"
                        />
                      </div>
                    </div>
                  </li>
                  <label v-else
                    >Star important boards to access them quickly and
                    easily.</label
                  >
                </ul>
              </div>
            </template>
          </Popper>
        </section>
        <section class="trello-actions-more">
          <button class="nav-item">
            <span :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              >More</span
            >
            <svg
              :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              width="18"
              height="18"
              role="presentation"
              focusable="false"
              viewBox="0 0 30 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </section>
        <Popper
          class="popper-create"
          :class="popperClass"
          offsetSkid="118"
          @open:popper="toggleModal"
          @close:popper="toggleModal"
        >
          <button class="btn-create">
            <span :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              >Create</span
            >
          </button>
          <template #content="{ close }">
            <div>
              <createBoardPopperTemplateVue
                :isModalOpen="isModalOpen"
                @closeModal="close"
              />
            </div>
          </template>
        </Popper>
      </section>
      <button class="humburger">
        <font-awesome-icon
          :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
          icon="fa-solid fa-bars"
          class="icon"
        />
      </button>
      <section class="user">
        <div class="search">
          <input
          class="search-input"
          :class="placeholderColor"
            :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
            type="search"
            placeholder="Search"
          />
          <span
            :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
            class="icon"
          >
            <svg
              :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
              class="icon-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path
              :style="!getCalcColor?.isDark ? { color: 'black' } : ''"
                d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <notifications />
        <Popper offsetDistance="0" class="user-popper">
          <img
            v-if="loggedInUser"
            class="user-img"
            :src="loggedInUser?.imgUrl"
            alt="member"
          />
          <template #content="{ close }">
            <div class="popper-template user-popper-info">
              <h1>Account</h1>
              <div class="user-info">
                <img
                  v-if="loggedInUser"
                  class="user-img"
                  :src="loggedInUser?.imgUrl"
                  alt="member"
                />
                <div class="user-info-detailes">
                  <p>{{ loggedInUser?.fullname }}</p>
                  <p class="username">{{ loggedInUser?.username }}</p>
                </div>
              </div>
              <span class="line"></span>
              <button class="btn-logout" @click="doLogout">Log out</button>
            </div>
          </template>
        </Popper>
      </section>
    </nav>
  </header>
</template>
<script>
import notifications from "./notifications.vue";
import { eventBus } from "../services/event-bus.service";
import createBoardPopperTemplateVue from "./create-board-popper-template.vue";
export default {
  data() {
    return {
      isModalOpen: false,
      calculatedColor: null,
      boards: null,
    };
  },
  created() {
    this.boards = this.getBoards;
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    updateHeaderColor(calcColor) {
      this.calculatedColor = calcColor;
      const board = JSON.parse(JSON.stringify(this.getCurrBoard));
      board.style.calcColor = calcColor;
      this.$store.dispatch({ type: "updateBoard", board });
    },
    removerStarred(board) {
      const boardToUpdate = JSON.parse(JSON.stringify(board));
      boardToUpdate.isStarred = false;
      this.$store.dispatch({
        type: "updateRemoveStarredBoard",
        board: boardToUpdate,
      });
    },
    moveToBoard(board) {
      this.$store.dispatch({ type: "setCurrBoard", boardId: board._id });
      this.$router.push(`/board/${board._id}`);
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    popperClass() {
      return this.isModalOpen ? "popper-opened" : "popper-closed";
    },
    getBoards() {
      return this.$store.getters.boards;
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    },
    getCalcColor() {
      if (this.$route.path === "/board" || this.$route.path === "/login") {
        return { color: "black", isDark: true };
      }
      return this.$store.getters.currBoard?.style?.calcColor;
    },
    staredBoards() {
      return this.getBoards?.filter((board) => board.isStarred).length > 0;
    },
    placeholderColor(){
      if(!this.getCalcColor?.isDark) return 'black'
      else return 'white'
    }
  },
  components: {
    notifications,
    createBoardPopperTemplateVue,
  },
};
</script>
