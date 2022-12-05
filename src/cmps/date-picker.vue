<template lang="">
    <Popper>
    <div class="task-option-btn">
      <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
      <p>Date</p>
    </div>
      <template #content>
      <div class="popper-content label-picker ">
      <popper-modal title="Date" />
      <v-date-picker v-model="date" />

      </div>
      </template>
    </Popper>
</template>

  <script>
  import popperModal from './popper-modal.vue';
  export default {
      props:{
          members: Array
      },
      created(){
          this.currMembers = this.members
      },
      data(){
          return{
              date:'',
          }    
      },
      components:{
        popperModal
      }
  }
  </script>
  <style lang="scss">
    .date-picker{
  //     color: var(--ds-text, #172b4d);
  // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  // font-size: 14px;
  // line-height: 20px;
  // padding: 20px;
  //       width: 310px;
  // background-color: var(--ds-surface-overlay, #ffffff);
  // border-radius: 3px;
  // box-shadow: var(--ds-shadow-overlay, 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08));
  // box-sizing: border-box;
  // outline: 0;
  // overflow: hidden;
  //     text-align: center;
    }
  </style>