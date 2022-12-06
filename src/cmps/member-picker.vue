<template lang="">
    <Popper>
      <div class="task-option-btn btn-members">
        <span class="icon-actions member-icon"></span>      
        <p>Members</p>
      </div>
      <template #content="{close}">
        <popperMember @addMember="addMember" :members="this.members" />
      </template>
    </Popper>
  </template>
<script>
import popperMember from './popper-member.vue';
export default {
    props:{
        members: Array
    },
    methods:{
      addMember(members){
        this.$emit('addMember',members)
      }
    },  
    components:{
      popperMember
    }
}
</script>
