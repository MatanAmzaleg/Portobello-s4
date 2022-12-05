<template lang="">
    <Popper>
      <div class="task-option-btn btn-members">
        <span class="icon-actions member-icon"></span>      
        <p>Members</p>
      </div>
      <template #content>
        <div class="popper-content member-picker">
          <popperModal title="Members" />
          <div class="members-section">
            <input v-model="input" class="members-input-search" type="search" placeholder="Search Members">
            <div class="members">
              <h5 class="board-members-title">Board members</h5>
              <div class="board-members">
                <div @click="addMember(member._id)" v-for="member in boardMembers" class="member">
                  <img class="member-img" :src="member.imgUrl">
                  <p class="member-name">{{member.fullname}}</p>
                  <font-awesome-icon v-if="members.includes(member._id)" class="checkedIcon" icon="fa-solid fa-check" />
                </div>
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
          console.log(this.userOnTask);
          console.log(this.members);
    },
    userOnTask(userId){
      console.log(userId);
        return 
      }
    },
    computed: {
     
    },
    components:{
      popperModal
    }
}
</script>
