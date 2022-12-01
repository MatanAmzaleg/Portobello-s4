import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import Popper from "vue3-popper";
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

library.add(fas, far, fab)
const app = createApp(rootCmp)
    .component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.component("Popper", Popper);

app.mount('#app')
