<template>
  <button @click="toggleNotifications">
    <font-awesome-icon icon="fa-solid fa-bell" />
  </button>
  <section v-if="isShown" class="notifications">
    <h4>Notifications</h4>
    <div v-for="notification in user.Notifications" @click="openNotifications(notification)" >
      <h4>Username</h4>
      <h5 @click="openTaskDetails(notification)">{{ notification.taskTitle }}</h5>
      <small>5 hours ago</small>
    </div>
  </section>
</template>
<script>
export default {
  name: "notification",
  data() {
    return {
      user: {},
      isShown: false,
    };
  },
  created() {
    //Get user
  },
  methods: {
    toggleNotifications(){
        this.isShown = !this.isShown
    }

  },
  computed: {

  },
};
</script>
<style lang=""></style>
