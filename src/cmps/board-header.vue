<template>
  <div class="board-header">
    <div class="board-info">
      <input type="text">
      <i class="fa-light fa-star"></i>
      <select>
        <option value="board">Board</option>
      </select>
      <h5>Filter cmp</h5>
      <h5>Board memebers</h5>
      <h5>Share</h5>
      <h5>Menu</h5>
    </div>
  </div>
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
<style lang=""></style>
