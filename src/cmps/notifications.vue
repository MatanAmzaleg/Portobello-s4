<template>
  <Popper class="user-popper" offsetSkid="-210" >
            <div @click="cleanNotifications" class="notifications-bell-container">
            <font-awesome-icon icon="fa-solid fa-bell" />
            <div v-if="isNewNotification" class="new-notification-container"><span class="new-notifications">{{unread}}</span></div>
            </div>
          <template #content="{ close }" >
            <div class="popper-template notifications-popper">
            <div class="notifications-header">
              <h1>Notifications</h1>
            </div>
              <span class="line"></span>
              <div class="notification-container" v-if="(userNotifications.length > 0)">
              <div class="notification" v-for="notification in notifications">
              <img :src="notification.imgUrl" class="member-img-card">
              <h1>{{notification.msg}}''</h1>
            </div>
              </div>
              <div v-else class="no-notification">
                <img alt="Taco" src="https://a.trellocdn.com/prgb/dist/images/taco-sleep.ee2660df9335718b1a80.svg">
                <h1>No Unread notifications</h1>
                <p>Click View all to view all of your notifications</p>
              </div>
            </div>
          </template>
        </Popper>
</template>
<script>
import { normalizeStyle } from 'vue';

export default {
  name: "notification",
  data() {
    return {
      notifications:[],
      isNewNotification:false,
      unread:0,
    };
  },
  created() {
    socketService.on('new-notification',() => {
      this.isNewNotification = true
      this.unread++
    })
    this.notifications = this.userNotifications
  },
  methods: {
    cleanNotifications(){
      this.isNewNotification = false
      this.unread = 0
    }
  },
  computed: {
    isNotification(){
      return this.notifications.length > 0 ? true : false
    },
    userNotifications(){
      return this.$store.getters.notifications
    }
  },
};
</script>
<style lang=""></style>
