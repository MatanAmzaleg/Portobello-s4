<template>
  <section v-if="board" class="board-header">
    <div class="left-section">
      <span
        :style="!calculatedColor?.isDark ? { color: 'black' } : { color: 'white' }"
        class="board-name-input"
        role="textbox"
        ref="span"
        @input="changeBoardName"
        contenteditable
      >
        {{ board.title }}
      </span>
      <button @click="changeBoardIsStarred" class="is-starred">
        <font-awesome-icon
          class="star-icon"
          v-if="!board.isStarred"
          icon="fa-regular fa-star"
        />
        <img
          class="yellow-star"
          src="../assets/icons/star.png"
          v-if="board.isStarred"
          alt=""
        />
      </button>
    </div>
    <div class="right-section">
      <popper>
        <button
          @click="changeIsModalOpen"
          :style="!calculatedColor?.isDark ? { color: 'black' } :  { color: 'white' }"
          class="filter-btn"
        >
        <svg class="filter-icon" :style="!calculatedColor?.isDark ? { color: 'black' } :  { color: 'white' }" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z" fill="currentColor"></path></svg>
          Filter
        </button>
        <template #content="{ close }">
          <div class="popper-content">
            <section class="filter-popper">
              <popperModal
                :title="'Filter'"
                @closeModal="close"
                :hasBtnBack="false"
              />
              <section class="keyword-filter">
                <p class="mini-title">Keyword</p>
                <input
                  ref="filterInput"
                  @input="setFilter"
                  v-model="filterBy.txt"
                  class="keyword-input"
                  type="search"
                  placeholder="Enter a keyword..."
                />
                <p class="smaller">Search cards, members, labels, and more.</p>
              </section>
              <section class="members-filter">
                <p class="mini-title">Members</p>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>No members</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>Cards assigned to me</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>Select members</p>
                </label>
              </section>
              <section class="date-filter">
                <p class="mini-title">Due date</p>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>No dates</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>Overdue</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>Due in the next day</p>
                </label>
              </section>

              <section class="labels-filter">
                <p class="mini-title">Labels</p>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <p>photo</p>
                  <p>No labels</p>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <button class="label-btn"></button>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <button class="label-btn"></button>
                </label>
                <label class="member-label" for="">
                  <input type="checkbox" />
                  <button class="label-btn"></button>
                </label>
              </section>
            </section>
          </div>
        </template>
      </popper>
      <mini-users-designed
        v-if="board.members"
        :memberIds="getBoardMembers"
      ></mini-users-designed>
      <Popper>
        <el-button :style="!calculatedColor?.isDark ? { color: 'black' } :  { color: 'white' }"
          >Share</el-button
        >
        <template #content="{ close }">
          <popperAddMember @closeModal="close" />
        </template>
      </Popper>
      |

      <button @click="$emit('openBoardMenu')" class="ellipsis-btn">
        <font-awesome-icon
          :style="!calculatedColor?.isDark ? { color: 'black' } : { color: 'white' }"
          class="ellipsis-icon"
          icon="fa-solid fa-ellipsis"
        />
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
  },
  data() {
    return {
      currBoard: null,
      filterBy: {
        txt: "",
      },
      isModalOpen: false,
      boardName: "",
      calculatedColor: null,
    };
  },
  created(){
      eventBus.on("headerColor", this.updateHeaderColor);
  },
  mounted() {
    console.log(this.members)
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
      console.log("boarddddddddddd",board);
      this.$store.dispatch({ type: "updateBoard", board });
    },
  },
  computed: {
    getBoardMembers(){
      return this.board.members.map(member => member._id)
    },
    getCalcColor(){
      return this.$store.getters.currBoard?.style?.calcColor
    },
    getCurrBoard(){
      return this.$store.getters.currBoard
    }
  },
  components: {
    miniUsers,
    memberPicker,
    miniUsersDesigned,
    popperAddMember,
    popperModal
  },
};
</script>
