<template>
  <Popper @open:popper="addFocus" offsetSkid="69" offsetDistance="5">
    <div class="task-option-btn btn-members">
      <span class="icon-actions member-icon"></span>
      <p>Members</p>
    </div>
    <template #content="{ close }">
      <popperMember @closeModal="close" @addMember="addMember" :members="this.members" />
    </template>
  </Popper>
</template>
<script>
import popperMember from './popper-member.vue';
import { eventBus } from '../services/event-bus.service';
export default {
  props: {
    members: Array
  },
  methods: {
    addMember(members) {
      this.$emit('addMember', members)
    },
    addFocus() {
      eventBus.emit('update-focus')
    },
  },
  components: {
    popperMember
  }
}
</script>
