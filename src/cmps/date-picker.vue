<template lang="">
    <Popper>
    <div class="task-option-btn">
        <font-awesome-icon :style="{'height': 12+'px'}" icon="fa-regular fa-clock" />
      <button>Date</button>
    </div>
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
    .task-option-btn{
      display: flex;
      gap: 5px;
      background-color: var(--ds-background-neutral,#091e420a);
     text-align: left;
      padding: 6px 12px;
      width: 170px;
    }
          .member-picker{
          padding: 20px;
          width: 200px;
          text-align: center;
          background-color: white;
      }
  </style>