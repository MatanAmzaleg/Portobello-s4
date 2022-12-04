<template lang="">
  <Popper>
  <div class="task-option-btn">
    <font-awesome-icon class="icon" icon="fa-regular fa-user" />      
     <p>Members</p>
  </div>
    <template #content>
    <div class="popper-content member-picker">
      <popper-modal title="Members" />
      <h1>Members</h1>
      <input type="search" placeholder="Search Members">
      <div class="labels">
      <small>Members</small>
      <div v-for="id in members" class="member">
        <img class="member-img" :src="getMemberImg(id)">
        <span>{{getMemberName(id)}}</span>
      </div>
      <h1>Board Members</h1>
      <div class="board-members">
        <div @click="addMember(member._id)" v-for="member in boardMembers" class="member">
        <img class="member-img" :src="member.imgUrl">
        <span>{{member.fullname}}</span>
      </div>
      </div>
      </div>
    </div>
    </template>
  </Popper>
</template>
<script>
import popperModal from './popper-modal.vue';
export default {
    props:{
        members: Array
    },
    created(){
      this.boardMembers = this.$store.getters.currBoard.members
    },
    data(){
        return{
            boardMembers : []
        }
    },
    methods:{
      getMemberName(id) {
        console.log(id,this.boardMembers)
      const member = this.boardMembers.find((m) => m._id === id);
      return member.fullname;
    },
    getMemberImg(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.imgUrl;
    },
    addMember(id){
      this.$emit('addMember',id)
    }
    },
    components:{
      popperModal
    }
}
</script>
<style lang="scss">
        .member-picker{
        padding: 20px;
        width: 310px;
        text-align: center;
        .member{
          display: flex;
          justify-content: flex-start;
          margin-bottom: 5px;
          gap: 15px;
        }
        .member-img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
    
        }
    }
</style>