<template lang="">
  <div class="main-task-members-container">
    <p v-if="!noHeader" class="main-task-members-header">Members</p>
    <div class="main-task-members">
      <ul v-for="user in users">
        <li>
          <img class="main-task-member-img" :src="user.imgUrl" alt="member" />
        </li>
      </ul>
      <button v-if="users" class="plus-btn">
        <font-awesome-icon class="plus-icon" icon="fa-solid fa-plus" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    memberIds: Array,
    isHeader: Boolean,
  },
  data() {
    return {
      usersToShow: [],
      allUsers: [],
      noHeader: false,
    };
  },
  created() {
    if (this.isHeader) this.noHeader = this.isHeader;
    if (!this.memberIds) {
      this.usersToShow = this.$store.getters.currBoard.members;
      this.noHeader = true;
      return;
    }
    this.allUsers = this.$store.getters.currBoard.members;
  },
  computed: {
    users() {
      this.usersToShow = [];
      if (this.memberIds) {
        Object.values(this.memberIds).map((memberId) => {
          let user = this.allUsers.find((user) => user._id === memberId);
          this.usersToShow.push(user);
        });
      }
      return this.memberIds ? this.usersToShow : [];
    },
  },
};
</script>

