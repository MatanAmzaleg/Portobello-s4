<template>
  <section>
    <user-msg/>
    <home-header v-if="routeIsHome"/>
    <app-header v-else/>
    <router-view/>
  </section>
</template>

<script>

import { store } from './store/store'
import appHeader from './cmps/app-header2.vue'
import homeHeader from './cmps/home-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {
  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  computed: {
    routeIsHome() {
      return this.$route.path === "/"
    }
  },
  components: {
    appHeader,
    homeHeader,
    userMsg
  },
}
</script>