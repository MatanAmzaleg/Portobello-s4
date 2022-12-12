<template>
  <section v-if="board" class="board-header">
    <div class="left-section">
      <div v-if="!isSliderOpen" @click="$emit('openSliderMenu')" class="right-arrow">
        <font-awesome-icon :style="{ color: getCalcColor?.isDark ? 'white' : 'black' }" class="right-arrow-icon"
          icon="fa-solid fa-angle-right" />
      </div>
      <span :style="{ color: getCalcColor?.isDark ? 'white' : 'black' }" class="board-name-input" role="textbox"
        ref="span" @input="changeBoardName" contenteditable>
        {{ board.title }}
      </span>
      <button @click="changeBoardIsStarred" class="is-starred">
        <font-awesome-icon :style="
          !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
        " v-if="!board.isStarred" class="star-icon" icon="fa-regular fa-star" />
        <font-awesome-icon :style="{ color: '#F2D600' }" v-if="board.isStarred" class="yellow-star"
          icon="fa-solid fa-star" />
      </button>
    </div>
    <div class="right-section">
      <button @click="goToDshboard" class="dashboard-btn">
        <font-awesome-icon class="dashboard-icon" :style="
          !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
        " icon="fa-solid fa-chart-line" />
      </button>
      <popper>
        <button @click="changeIsModalOpen" :style="
          !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
        " class="filter-btn">
          <svg class="filter-icon" :style="
            !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
          " width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
              fill="currentColor"></path>
          </svg>
          Filter
        </button>
        <template #content="{ close }">
          <div class="popper-content">
            <section class="filter-popper">
              <popperModal :title="'Filter'" @closeModal="close" :hasBtnBack="false" />
              <section class="keyword-filter">
                <p class="mini-title">Keyword</p>
                <input ref="filterInput" @input="setFilter" v-model="filterBy.txt" class="keyword-input" type="search"
                  placeholder="Enter a keyword..." />
                <p class="smaller">Search cards, members, labels, and more.</p>
              </section>
              <section class="members-filter">
                <p class="mini-title">Members</p>
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.noMembers" v-model="filterBy.noMembers"
                    @input="setFilter" />
                  <span class="grey-icon icon-actions member-icon"></span>
                  <p>No members</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.byMe" v-model="filterBy.byMe" @input="setFilter" />
                  <img :src="userImg" class="member-img-card" />
                  <p>Cards assigned to me</p>
                </label>
              </section>
              <section class="date-filter">
                <p class="mini-title">Due date</p>
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.noDates" v-model="filterBy.noDates" @change="setFilter" />
                  <div class="calender-div">
                    <font-awesome-icon class="calender" icon="fa-solid fa-calendar-days" />
                  </div>
                  <p>No dates</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.overdue" v-model="filterBy.overdue" @change="setFilter" />
                  <div class="red-div">
                    <font-awesome-icon class="clock" icon="fa-regular fa-clock" />
                  </div>
                  <p>Overdue</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.dueNextDay" v-model="filterBy.dueNextDay"
                    @change="setFilter" />
                  <div class="yellow-div">
                    <font-awesome-icon class="clock" icon="fa-regular fa-clock" />
                  </div>
                  <p>Due in the next day</p>
                </label>
              </section>

              <p class="mini-title">Labels</p>
              <section class="labels-filter">
                <label class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.noLabels" v-model="filterBy.noLabels" @change="setFilter" />
                  <span class="label-icon icon-actions grey-icon"></span>
                  <p>No labels</p>
                </label>
                <label v-for="label in labelsToShow" class="member-label" for="">
                  <input type="checkbox" :checked="filterBy.labels" v-model="filterBy.labels" @change="setFilter" />
                  <button class="label-btn" :style="{ 'background-color': labelColor(label) }"></button>
                </label>
              </section>
            </section>
          </div>
        </template>
      </popper>
      <mini-users-designed v-if="board.members" :memberIds="getBoardMembers"></mini-users-designed>
      <Popper>
        <button class="share-button" :style="
          !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
        ">
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
              fill="currentColor"></path>
            <path
              d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
              fill="currentColor"></path>
          </svg>
          Share
        </button>
        <template #content="{ close }">
          <popperAddMember @closeModal="close" />
        </template>
      </Popper>
      <button @click="$emit('openBoardMenu')" class="ellipsis-btn">
        <font-awesome-icon :style="
          !getCalcColor?.isDark ? { color: 'black' } : { color: 'white' }
        " class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
      </button>
    </div>
  </section>
  <img class="loader" v-else src="../assets/icons/loader.svg" alt="" />
</template>
<script>
import { eventBus } from "../services/event-bus.service";
import miniUsersDesigned from "./mini-users-designed.vue";
import miniUsers from "./mini-users.vue";
import popperAddMember from "./popper-add-member.vue";
import memberPicker from "./member-picker.vue";
import popperModal from "./popper-modal.vue";
export default {
  props: {
    board: Object,
    isSliderOpen: Boolean,
  },
  data() {
    return {
      currBoard: null,
      filterBy: {
        txt: "",
        noMembers: false,
        noDates: false,
        overdue: false,
        dueNextDay: false,
        noLabels: false,
        byMe: false,
        labels: [],
      },
      isModalOpen: false,
      boardName: "",
      calculatedColor: null,
      labelsToShow: null,
    };
  },
  created() {
    let board = JSON.parse(JSON.stringify(this.getCurrBoard));
    let labelsToShow = [];
    board.groups.map((group) => {
      return group.tasks.map((task) => {
        if (task.labelIds?.length) labelsToShow.push(...task.labelIds);
        return task;
      });
    });
    this.labelsToShow = labelsToShow;
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
    changeBoardName() {
      const boardToUpdate = JSON.parse(JSON.stringify(this.board));
      boardToUpdate.title = this.$refs.span.innerText;
      this.$emit("updateBoard", boardToUpdate);
    },
    changeBoardIsStarred() {
      const boardToUpdate = JSON.parse(JSON.stringify(this.board));
      boardToUpdate.isStarred = !boardToUpdate.isStarred;
      this.$emit("updateBoard", boardToUpdate);
    },
    changeIsModalOpen() {
      this.isModalOpen = true;
      setTimeout(() => {
        this.$refs.filterInput.focus();
      }, 50);
    },
    updateHeaderColor(calcColor) {
      this.calculatedColor = calcColor;
      const board = JSON.parse(JSON.stringify(this.getCurrBoard));
      board.style.calcColor = calcColor;
      this.$store.dispatch({ type: "updateBoard", board });
    },
    goToDshboard() {
      this.$emit("closeBoardMenu");
      this.isModalOpen = false;
      this.$router.push(`/board/${this.board._id}/dashboard-route`);
    },
    labelColor(id) {
      const label = this.$store.getters.currBoard.labels.find((l) => {
        return l.id === id;
      });
      if (!label) return;
      return label.color;
    },
  },
  computed: {
    getBoardMembers() {
      return this.$store.getters.currBoard.members.map((member) => member._id);
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    },
    getCalcColor() {
      return this.$store.getters.currBoard?.style?.calcColor;
    },
    userImg() {
      return this.$store.getters.loggedinUser.imgUrl;
    },
  },
  components: {
    miniUsers,
    memberPicker,
    miniUsersDesigned,
    popperAddMember,
    popperModal,
  },
};
</script>
