<template>
  <section>
    <notifications />
    <home-header v-if="routeIsHome"/>
    <app-header v-else/>
    <router-view/>
  </section>
</template>

<script>

import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import homeHeader from './cmps/home-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'
import { utilService } from './services/util.service'

export default {
  created() {
    console.log('Running Portobello!')
    const user = userService.getLoggedinUser()
    this.$store.dispatch({type:'loadUsers'})
    if (user)  store.commit({type: 'setLoggedinUser', user})
    utilService.fetchListOfPhotos('random')
    utilService.fetchListOfPhotos('random', '2')
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