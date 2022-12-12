<template lang="">
 <Popper @open:popper="updateInputFocus">
    <div class="task-option-btn">
      <span class="checklist-icon icon-actions"></span>
      <p>Smart Checklist</p>
    </div>
    <template #content="{ close }">
      <div class="popper-content label-picker">
        <popperModal title="Smart Checklist" @closeModal="close" />
        <div class="content-container">
          <label>Checklist for</label>
          <input ref="focusInput" class="task-popper-input" v-model="userInput" />
          <el-button
            class="add-save-btn add-save-btn2"
            @click="createChecklist"
            type="primary"
            >Add</el-button
          >
        </div>
      </div>
    </template>
  </Popper>
</template>
<script>
import popperModal from './popper-modal.vue'
import {boardService} from '../services/board.service.js'
import { utilService } from '../services/util.service'
export default {
    data(){
        return{
            userInput:'',
        }
    },
    methods:{
        async createChecklist(){
            const checklist = await boardService.aiQuery(this.userInput)
            const todos = checklist.result.split(/\r?\n/);
            todos.splice(0,2)
            const todosToAdd = todos.map(todo => ({id:utilService.makeId(), title:todo, isDone:false}))
            const newChecklist = {
              title:this.userInput,
              id:utilService.makeId(),
              todos:todosToAdd
            }
            this.$emit('addSmartList',newChecklist)
        }
    },
    components:{
      popperModal
    }
    
}
</script>
<style lang="">
    
</style>