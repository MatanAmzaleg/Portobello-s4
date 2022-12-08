<template>
  <div class="container-auth">
    <div class="app-title">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1"
        x="0px" y="0px" height="40px" viewBox="0 -15 200 190">
        <g>
          <path class="st0" fill="#0079BF"
            d="M155.7,9.7H30.1c-10.8,0-19.6,8.8-19.6,19.6V155c0,10.8,8.8,19.6,19.6,19.6h125.7c10.8,0,19.6-8.8,19.6-19.6    V29.3C175.3,18.4,166.6,9.7,155.7,9.7z M81.5,128.4c0,3.6-2.9,6.5-6.5,6.5H47.4c-3.6,0-6.5-2.9-6.5-6.5V46.6    c0-3.6,2.9-6.5,6.5-6.5H75c3.6,0,6.5,2.9,6.5,6.5V128.4z M144.9,90.9c0,3.6-2.9,6.5-6.5,6.5h-27.6c-3.6,0-6.5-2.9-6.5-6.5V46.6    c0-3.6,2.9-6.5,6.5-6.5h27.6c3.6,0,6.5,2.9,6.5,6.5V90.9z" />
        </g>
      </svg>
      <h1>Portobello</h1>
    </div>
    <p>{{ msg }}</p>
    <div v-if="loggedinUser">
      <!-- <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3> -->
    </div>
    <div v-else class="login">
      <p>Log in to Portobello</p>
      <div class="login-form">
        <input ref="usernameInput" @keyup.enter="continuToLogin" @input="updateUsernameInput"
          placeholder="Enter username" />
        <input type="password" v-if="showPasswordInput" ref="passwordInput" placeholder="Enter password" @keyup.enter="doLogin"
          @input="updatePasswordInput" />
        <button class="submit" @click="doLogin">{{ showPasswordInput ? 'Log in' : 'Continue' }}</button>
      </div>
      <p class="mute">user1 or admin, pass:123 </p>
    </div>
    <form @submit.prevent="doSignup" class="login-form">
      <h2>Signup</h2>
      <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <img-uploader @uploaded="onUploaded"></img-uploader>
      <button>Signup</button>
    </form>
    <hr />
    <details>
      <summary>
        Admin Section
      </summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>

import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
      showPasswordInput: false
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    updateUsernameInput(ev) {
      this.loginCred.username = ev.target.value
    },
    updatePasswordInput(ev) {
      this.loginCred.password = ev.target.value
    },
    continuToLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      else {
        this.showPasswordInput = true
        setTimeout(() => {
          this.$refs.passwordInput.focus()
        }, 50)
      }
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        this.showPasswordInput = true
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }
  },
  components: {
    imgUploader
  }
}
</script>