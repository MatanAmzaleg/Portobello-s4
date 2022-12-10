<template>
  <section class="left-slider">
    <div class="header flex">
      <div class="trello-icon flex">
        <h1>T</h1>
      </div>
      <div class="titles flex">
        <h3>Trello Workspace</h3>
        <p>Free</p>
      </div>
      <button class="left-arrow" @click="$emit('closeSliderMenu')">
        <font-awesome-icon
          class="left-arrow-icon"
          icon="fa-solid fa-angle-left"
        />
      </button>
    </div>
    <hr />
    <div class="first-section">
      <div class="boards flex">
        <font-awesome-icon class="icon" icon="fa-brands fa-trello" />
        <p>Boards</p>
      </div>
      <div class="boards members flex">
        <span class="member-icon"></span>
        <p>Members</p>
        <button class="plus">
          <font-awesome-icon class="icon-plus" icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <div class="your-boards-section">
      <div class="mini-header flex">
        <p>Your boards</p>
        <button class="plus">
          <font-awesome-icon class="icon-plus-bigger" icon="fa-solid fa-plus" />
        </button>
      </div>

      <!-- PUT BOARD LIST HERE -->
    </div>
  </section>
</template>


