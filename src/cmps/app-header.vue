<template>
  <header class="app-header">
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
        <Popper class="popper-create">
          <button class="btn-create">
            <span>Create</span>
          </button>
          <template #content>
            <createBoardPopperTemplateVue />
          </template>
          <!-- <template #content>
            <div class="member-picker">
              <header>
                <h1>Create board</h1>
                <button class="back">
                  <span>
                    <svg width="10" height="18" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.292893 8.29292L7.36396 1.22185C7.75449 0.831324 8.38765 0.831324 8.77817 1.22185C9.1687 1.61237 9.1687 2.24554 8.77817 2.63606L2.41421 9.00002L8.77818 15.364C9.1687 15.7545 9.1687 16.3877 8.77818 16.7782C8.38765 17.1687 7.75449 17.1687 7.36396 16.7782L0.292893 9.70713C-0.0976312 9.3166 -0.0976312 8.68344 0.292893 8.29292Z"
                        fill="grey"></path>
                    </svg>
                  </span>
                </button>
                <button class="close">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="grey"></path>
                    </svg>
                  </span>
                </button>
              </header>
              <div class="content">
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="board-background">
                  <label for="background-picker">Background</label>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
                <div class="content-board-img">
                  <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                      alt="" role="presentation">
                  </div>
                </div>
              </div>
            </div>
          </template> -->
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
import createBoardPopperTemplateVue from './create-board-popper-template.vue';
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    notifications,
    createBoardPopperTemplateVue
  }
}
</script>
