<template>
  <div v-if="this.memberIds" class="main-task-members-container">
    <p v-if="!noHeader" class="main-task-members-header">Members</p>
    <div class="main-task-members">
      <ul>
        <li v-for="user in users">
          <img class="main-task-member-img" :src="user.imgUrl" alt="member" />
        </li>
      </ul>
      <button v-if="users" class="plus-btn">
      <popper>
        <font-awesome-icon class="plus-icon" icon="fa-solid fa-plus" />
        <template #content="{close}">
        <popperMember @addMember="addMember" :members="this.memberIds" @closeModal="close"/>
      </template>
      </popper>
      </button>
    </div>
  </div>
</template>
<script>
import popperMember from './popper-member.vue';
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
  methods:{
    addMember(members){
        this.$emit('addMember',members)
      }
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
  components:{
    popperMember
  }
};
</script>

