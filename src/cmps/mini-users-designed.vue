<template>
  <section class="mini-users-designed">
    <ul v-if="usersToShow" >
      <li v-for="user in usersToShow">
        <img class="main-task-member-img" :src="user.imgUrl" alt="member" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "mini-users-designed",
  props: {
    memberIds: Array,
  },

  data() {
    return {
      usersToShow: [],
      allUsers: [],
    };
  },
  created() {
    this.allUsers = this.$store.getters.currBoard.members;
    this.getUsersOnTask();
  },
  methods: {
    getUsersOnTask() {
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

  watch: {
    memberIds(newMmbers, oldMembers) {
      this.getUsersOnTask();
    },
  },
};
</script>
