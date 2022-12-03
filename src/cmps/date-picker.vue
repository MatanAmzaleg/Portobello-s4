<template lang="">
    <Popper>
    <div class="task-option-btn">
        <font-awesome-icon :style="{'height': 12+'px'}" icon="fa-regular fa-clock" />
      <button>Date</button>
    </div>
      <template #content>
      <div class="date-picker">
      <div class="date-picker">
        <el-date-picker
        v-model="value2"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
      </div>
      </div>
      <popper-modal title="Date" />
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
              currMembers: [],
          }    
      },
      components:{
        popperModal
      }
  }
  </script>
  <style lang="scss">
    .date-picker{
      color: var(--ds-text, #172b4d);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: var(--ds-surface-overlay, #ffffff);
  border-radius: 3px;
  box-shadow: var(--ds-shadow-overlay, 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08));
  box-sizing: border-box;
  outline: 0;
  overflow: hidden;
      text-align: center;
    }
  </style>