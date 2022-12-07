<template>
  <header :style="{'background-color':calculatedColor?.calcColor}" class="app-header">
    <nav>
      <section class="trello">
        <router-link to="/">
          <button class="logo">
            <font-awesome-icon class="icon" icon="fa-brands fa-trello" />
            <span class="title">Portobello</span>
          </button>
        </router-link>
        <section class="trello-actions">
          <button class="nav-item">
            <span>Workspaces</span>
            <svg width="18" height="18" role="presentation" focusable="false" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button class="nav-item">
            <span>Recent</span>
            <svg width="18" height="18" role="presentation" focusable="false" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button class="nav-item">
            <span>Starred</span>
            <svg width="18" height="18" role="presentation" focusable="false" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button class="nav-item">
            <span>Templates</span>
            <svg width="18" height="18" role="presentation" focusable="false" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"></path>
            </svg>
          </button>
        </section>
        <section class="trello-actions-more">
          <button class="nav-item">
            <span>More</span>
            <svg width="18" height="18" role="presentation" focusable="false" viewBox="0 0 30 25"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"></path>
            </svg>
          </button>
        </section>
        <Popper class="popper-create" :class="popperClass" offsetSkid="118" @open:popper="toggleModal" @close:popper="toggleModal">
          <button class="btn-create">
            <span>Create</span>
          </button>
          <template #content="{close}">
            <div>
              <createBoardPopperTemplateVue :isModalOpen="isModalOpen" @closeModal="close"/>
            </div>
          </template>
        </Popper>
      </section>
      <button class="humburger">
        <font-awesome-icon icon="fa-solid fa-bars" class="icon" />
      </button>
      <section class="user">
        <div class="search">
          <input type="search" placeholder="Search" />
          <span class="icon">
            <svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" role="presentation">
              <path
                d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </span>
        </div>
        <notifications />
      </section>
    </nav>
  </header>
</template>
<script>
import notifications from './notifications.vue';
import { eventBus } from "../services/event-bus.service";
import createBoardPopperTemplateVue from './create-board-popper-template.vue';
export default {
  data() {
    return {
      isModalOpen: false,
      calculatedColor:null
    }
  },
  created(){
    eventBus.on("headerColor", this.updateHeaderColor);
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    popperClass() {
      return this.isModalOpen? 'popper-opened' : 'popper-closed'
    }
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    updateHeaderColor(calcColor){
      this.calculatedColor = calcColor
    }
  },
  components: {
    notifications,
    createBoardPopperTemplateVue
  },
  watch:{
    calculatedColor(newColor, oldColor){
      
    }
  }
}
</script>
