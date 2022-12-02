<template>
  <section class="board-header">
    <div class="left-section">
      <h1>Trello</h1>
      <button class="is-starred"><font-awesome-icon class="star-icon" icon="fa-regular fa-star" /></button>
      |
      <h1>{{board.title}}</h1>
    </div>
    <div class="right-section">
      <popper>
        <button class="filter-btn"><img class="filter-icon" src="../assets/icons/filter-results-button.png" alt=""> Filter</button> 
        <template #content >
    <section class="filter-popper">
      <div class="header">
        <h1>Filter</h1>
        <button class="x-mark-btn"><font-awesome-icon class="x-mark-icon" icon="fa-solid fa-xmark" /></button>
      </div>
      <section class="keyword-filter">
        <p class="mini-title">Keyword</p>
        <input class="keyword-input" type="search" placeholder="Enter a keyword...">
        <p class="smaller">Search cards, members, labels, and more.</p>
      </section>
      <section class="members-filter">
        <p class="mini-title">Members</p>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>No members</h4>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>Cards assigned to me</h4>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>Select members</h4>
        </label>
      </section>
      <section class="date-filter">
        <p class="mini-title">Due date</p>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>No dates</h4>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>Overdue</h4>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>Due in the next day</h4>
        </label>
      </section>
      <section class="labels-filter">
        <p class="mini-title">Labels</p>
        <label class="member-label" for="">
          <input type="checkbox">
          <p>photo</p>
          <h4>No labels</h4>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <button class="label-btn"></button>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <button class="label-btn"></button>
        </label>
        <label class="member-label" for="">
          <input type="checkbox">
          <button class="label-btn"></button>
        </label>
      </section>
    </section>
  </template>
</popper>
|
      <button class="ellipsis-btn"><font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" /></button>
    </div>
  </section>
</template>
<script>
export default {
    props:{
        board:Object
    },
    data(){
        return{
            currBoard: null
        }
    }

}
</script>
<style lang="scss">

</style>
