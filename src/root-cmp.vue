<template>
  <section>
    <div v-if="poperIsOpen" class="background-cover-black" @click="(poperIsOpen = false)"></div>
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
import { socketService } from './services/socket.service'
import { eventBus } from './services/event-bus.service'

export default {
  data() {
    return {
      poperIsOpen: false
    }
  },
  created() {
    console.log('Running Portobello!')
    socketService.on('new-notification',this.addNotification)
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
    utilService.fetchListOfPhotos('random')
    utilService.fetchListOfPhotos('random', '2')
    eventBus.on('updatePoperIsOpen', this.updatePoper)
  },
  methods:{
    updatePoper(isOpen) {
      this.poperIsOpen = isOpen
    },
    addNotification(msg){
      console.log(msg)
      this.$store.commit({type:'addNotification',msg})
    }
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