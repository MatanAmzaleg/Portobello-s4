<template lang="">
  <div class="main-task-members-container">
    <div v-if="!noHeader" class="main-task-members-header">Members</div>
    <div class="main-task-members">
      <ul v-for="user in usersToShow">
        <li>
          <img class="main-task-member-img" :src="user.imgUrl" alt="member" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        memberIds:Array
    },
    data(){
      return{
        usersToShow:[],
        noHeader:false,
      }
    },
    created(){
      if(!this.memberIds){
        this.usersToShow = this.$store.getters.currBoard.members
        this.noHeader = true
        return
      }
        this.users = this.$store.getters.currBoard.members
        let usersToShow = []
        this.memberIds.map(memberId => {
          let user = this.users.find(user => user._id === memberId)
          usersToShow.push(user)
          return user
        })
        console.log(this.usersToShow,this.memberIds)
        this.usersToShow = usersToShow
    }
};
</script>
<style lang="scss">
.main-task-members-container {
  margin-right: 20px;
  ul {
    list-style: none;
  }
  flex-direction: column;
  padding-top: 3px;
  .main-task-members-header {
    margin-top: 0.8rem;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .main-task-members {
    display: flex;
    // margin-top: -0.8rem;
    margin-left: -0.1rem;
    // margin-bottom: 20px;
    .main-task-member-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}
</style>
