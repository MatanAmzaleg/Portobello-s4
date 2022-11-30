<template lang="">
  <Popper>
    <button>Members</button>
    <template #content>
    <div class="member-picker">
      <h1>Members</h1>
      <input type="search" placeholder="Search Members">
      <div class="labels">
      <small>Members</small>
      <li v-for="member in members">
      <div class="member">
        <font-awesome-icon icon="fa-solid fa-user" />
        <small>{{member._id}}</small>
      </div>
      </li>
      </div>
    </div>
    </template>
  </Popper>
</template>
<script>
export default {
    props:{
        members: Array
    },
    created(){
        this.currMembers = this.members
    },
    data(){
        return{
            currMembers: []
        }
    }
}
</script>
<style lang="scss">
        .member-picker{
        padding: 20px;
        width: 310px;
        text-align: center;
        background-color: white;
    }
</style>