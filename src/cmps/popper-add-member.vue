<template>
  <div class="popper-content member-picker">
    <popperModal title="Members" @closeModal="closeModal" />
    <div class="members-section">
      <input
        v-focus
        v-model="input"
        class="members-input-search"
        type="search"
        placeholder="Search Members"
      />
      <div class="members">
        <h5 class="board-members-title">Board members</h5>
        <div class="board-members">
          <div
            @click="addMember(member)"
            v-for="member in boardMembers"
            class="member"
          >
            <img class="member-img" :src="member.imgUrl" />
            <p class="member-name">{{ member.fullname }}</p>
            <font-awesome-icon
              v-if="members?.includes(member._id)"
              class="checkedIcon"
              icon="fa-solid fa-check"
            />
          </div>
        </div>
      </div>
      <div class="members">
        <h5 class="board-members-title">Members</h5>
        <div class="board-members">
          <div @click="addMember(member)" v-for="member in members" class="member">
            <img class="member-img" :src="member.imgUrl" />
            <p class="member-name">{{ member.fullname }}</p>
            <font-awesome-icon
              v-if="members?.includes(member._id)"
              class="checkedIcon"
              icon="fa-solid fa-check"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import popperModal from "./popper-modal.vue";
export default {
  created() {
    this.members = this.$store.getters.users
    this.boardMembers = JSON.parse(JSON.stringify(this.$store.getters.currBoard.members));
  },
  data() {
    return {
      boardMembers: [],
      input: "",
    };
  },
  methods: {
    getMemberName(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.fullname;
    },
    getMemberImg(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.imgUrl;
    },
    addMember(member) {
      let memberIdx = this.members.findIndex((id) => id === member._id);
      if (memberIdx === -1) {
        this.boardMembers.push(member);
      } else {
        this.boardMembers.splice(memberIdx, 1);
      }
      let newBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
      newBoard.members = this.boardMembers
      this.$store.dispatch({type:"updateBoard", board:newBoard});
    },
  },
  components: {
    popperModal,
  },
};
</script>
<style lang=""></style>
