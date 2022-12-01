<template>
  <section class="board-header">
    <div class="left-section">
      <h1>Trello</h1>
      <button class="is-starred"><font-awesome-icon class="star-icon" icon="fa-regular fa-star" /></button>
      |
      <h1>BoardName</h1>
    </div>
    <div class="right-section">
      <button class="filter-btn"><img class="filter-icon" src="../assets/icons/filter-results-button.png" alt=""> Filter</button> |
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
