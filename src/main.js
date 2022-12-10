import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import Popper from "vue3-popper";
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import VCalendar from 'v-calendar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import 'v-calendar/dist/style.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import vue3GoogleLogin from 'vue3-google-login'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Notifications from '@kyvg/vue3-notification'
import {
    focusDirective,
    rainbowDirective,
    customOnDirective,
    clickOutsideDirective,
} from './directives'

library.add(fas, far, fab)
const app = createApp(rootCmp)
    .component('font-awesome-icon', FontAwesomeIcon)

app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)
app.use(Notifications)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '792338395608-0napic6ee4qlku13ksqpq3o28sct8l7q.apps.googleusercontent.com'
  })
app.component('Datepicker', Datepicker);
app.use(VCalendar, {})
app.use(store)
app.use(FloatingVue)
app.use(ElementPlus)
app.component("Popper", Popper);

app.mount('#app')
