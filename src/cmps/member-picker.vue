<template lang="">
  <Popper>
  <div class="task-option-btn btn-members">
    <span class="icon-actions member-icon"></span>      
     <p>Members</p>
  </div>
    <template #content>
    <div class="popper-content member-picker">
      <popperModal title="Members" />
      <input v-model="input" class="members-input-search" type="search" placeholder="Search Members">
      <div class="members">
      <h5 class="board-members-title">Board Members</h5>
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
            boardMembers : [],
            input:''
        }
    },
    methods:{
      getMemberName(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.fullname;
    },
    getMemberImg(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.imgUrl;
    },
    addMember(memberId){
      let memberIdx = this.members.findIndex(id => id === memberId)
          if(memberIdx === -1){
            this.members.push(memberId)
          }
          else{
            this.members.splice(memberIdx,1)  
          }
          this.$emit('add-member',this.members)
    }
    },
    components:{
      popperModal
    }
}
</script>
<style lang="scss">

.members-input-search{
  border: none;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px var(--ds-border-input,#dfe1e6);
    line-height: 20px;
    margin-bottom: 12px;
    outline: none;
    padding: 8px 12px;
    width: 100%;
}
.board-members-title{
  text-align: left;
}
.board-members{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
        .member-picker{
        padding: 20px;
        width: 307px;
        text-align: center;
        background-color: white;

        .member{
          display: flex;
          margin-bottom: 5px;
          gap: 5px;
        }
        .member-img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
    
        }
    }
</style>