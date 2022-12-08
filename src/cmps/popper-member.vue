<template>
  <div class="popper-content member-picker">
    <popperModal title="Members" @closeModal="closeModal"/>
    <div class="members-section">
      <input ref="focusInput" v-focus @input="filterMembers" v-model="input" class="members-input-search" type="search" placeholder="Search Members"/>
      <div class="members">
        <h5 class="board-members-title">Board members</h5>
        <div class="board-members">
          <div @click="addMember(member._id)" v-for="member in boardMembers" class="member">
            <img class="member-img" :src="member.imgUrl">
            <p class="member-name">{{member.fullname}}</p>
            <font-awesome-icon v-if="members?.includes(member._id)" class="checkedIcon" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import popperModal from './popper-modal.vue';
import { eventBus } from '../services/event-bus.service';
export default {
  props: {
    members: Array
  },
  created() {
    this.boardMembers = this.$store.getters.currBoard.members
    eventBus.on('update-focus', this.updateInputFocus)
  },
  data() {
    return {
      boardMembers: [],
      input: ''
    }
  },
  methods: {
    getMemberName(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.fullname;
    },
    getMemberImg(id) {
      const member = this.boardMembers.find((m) => m._id === id);
      return member.imgUrl;
    },
    addMember(memberId) {
      if(!this.members){
        this.members = []
        this.$emit('add-member', this.members)

        // this.members.push(memberId)
        // return
      } 
      let memberIdx = this.members.findIndex(id => id === memberId)
      if (memberIdx === -1) {
        this.members.push(memberId)
      }
      else {
        this.members.splice(memberIdx, 1)
      }
      this.$emit('add-member', this.members)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    updateInputFocus() {
      setTimeout(() => {
        this.$refs?.focusInput?.focus();
      }, 50);
    }
  },
  components: {
    popperModal
  }
}
</script>
<style lang="">
    
</style>