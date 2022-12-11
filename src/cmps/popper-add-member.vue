<template>
  <div class="popper-content member-picker">
    <popperModal title="Members" @closeModal="closeModal" />
    <div class="members-section">
      <input
        @input="filterMembers"
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
            v-for="member in membersToShow"
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
import { socketService } from '../services/socket.service'

export default {
 created() {
   this.boardMembers = JSON.parse(JSON.stringify(this.$store.getters.currBoard.members));
   this.membersToShow = this.boardMembers
   this.members = this.$store.getters.users
  },
  data() {
    return {
      boardMembers: [],
      input: "",
      membersToShow: []
    };
  },
  methods: {
    filterMembers(){
      const regex = new RegExp(this.input, 'i'); 
      this.membersToShow = this.boardMembers.filter(member => regex.test(member.fullname) )
    },
    getMemberName(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.fullname;
    },
    getMemberImg(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.imgUrl;
    },
    addMember(member) {
      let memberIdx = this.boardMembers.findIndex(m => m._id === member._id);
      let username = this.$store.getters.loggedinUser.fullname
      let notification = {}
      if (memberIdx === -1) {
        this.boardMembers.push(member);
        notification.msg = `${username} Added you to board ` + this.$store.getters.currBoard.title
        notification.imgUrl = this.$store.getters.loggedinUser.imgUrl
      } else {
        this.boardMembers.splice(memberIdx, 1);
        notification.msg = `${username} Removed you from board ` + this.$store.getters.currBoard.title
        notification.imgUrl = this.$store.getters.loggedinUser.imgUrl
      }
      socketService.emit('notification',{notification,to:member._id})
      let newBoard = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
      newBoard.members = this.boardMembers
      this.$store.dispatch({type:"updateBoard", board:newBoard});
    },closeModal() {
      this.$emit("closeModal");
    },
  },
  components: {
    popperModal,
  },
};
</script>
<style lang=""></style>
