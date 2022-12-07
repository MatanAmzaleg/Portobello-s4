<template>
  <section v-if="board" class="board-header">
    <div class="left-section">
      <span
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
        <button @click="changeIsModalOpen" class="filter-btn">
          <img
            class="filter-icon"
            src="../assets/icons/filter-results-button.png"
            alt=""
          />
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
        <mini-users-designed  v-if="board.members" :memberIds="getBoardMembers"></mini-users-designed>
        <Popper>
          <el-button>Share</el-button>
      <template #content="{ close }">
        <popperAddMember @closeModal="close" />
      </template>
    </Popper>
      |

      <button @click="$emit('openBoardMenu')" class="ellipsis-btn">
        <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
      </button>
    </div>
  </section>
  <img class="loader" v-else src="../assets/icons/loader.svg" alt=""/>
</template>
<script>
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
    };
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
  },
  computed: {
    getBoardMembers(){
      return this.board.members.map(member => member._id)
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
