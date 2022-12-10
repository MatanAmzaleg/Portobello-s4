<template>
  <Popper class="user-popper" >
            <button @click="toggleNotifications">
    <font-awesome-icon icon="fa-solid fa-bell" />
  </button>
          <template #content="{ close }">
            <div class="popper-template user-popper-info">
              <h1>Notifications</h1>
              <span class="line"></span>
              <div class="notification" v-for="notification in notifications">
              <h1>{{notification}}</h1>
            </div>
            </div>
          </template>
        </Popper>
</template>
<script>
export default {
  name: "notification",
  data() {
    return {
      notifications:[],
      isShown: false,
    };
  },
  created() {
   this.notifications = this.$store.getters.notifications
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
