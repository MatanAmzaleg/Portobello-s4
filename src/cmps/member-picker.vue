<template lang="">
  <Popper>
  <div class="task-option-btn">
    <font-awesome-icon :style="{'height': 12+'px'}" icon="fa-solid fa-user" />       
     <button>Members</button>
  </div>
    <template #content>
    <div class="popper-content member-picker">
      <popper-modal title="Members" />
      <h1>Members</h1>
      <input type="search" placeholder="Search Members">
      <div class="labels">
      <small>Members</small>
      <div v-for="member in members" class="member">
        <font-awesome-icon icon="fa-solid fa-user" />
        <small>{{member}}</small>
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
      console.log(this.members)
        this.currMembers = this.members
    },
    data(){
        return{
            currMembers: []
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
        background-color: lightblue;
    }
</style>