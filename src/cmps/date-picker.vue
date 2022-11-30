<template lang="">
    <Popper>
      <button>Date</button>
      <template #content>
      <div class="date-picker">
        <h1>Date</h1>
        <div class="date"> <input type="date"> </div>
      </div>
      </template>
    </Popper>
</template>

  <script>
  import { ref } from 'vue'
  export default {
      props:{
          members: Array
      },
      created(){
          this.currMembers = this.members
      },
      data(){
          return{
              currMembers: [],
          }    
      }
  }
  </script>
  <style lang="scss">
          .member-picker{
          padding: 20px;
          width: 200px;
          text-align: center;
          background-color: white;
      }
  </style>