<template>
  <div class="task-edit-screen" @click="exitTask">
    <div v-if="task" class="task-edit-container" @click.stop>
      <div v-if="task.style && Object.keys(task.style).length !== 0" class="task-cover"
        :style="task.style?.bgColor ? { 'background-color': task.style.bgColor } : { 'background-image': 'url( ' + task.style.imgUrl + ')' }">
        <span></span>
      </div>
      <div class="task-section task-title">
        <span class="header-icon"></span>
        <div class="task-title-wrapper">
          <input v-model="task.title" @input="updateTask" type="text" />
          <p>in list {{ this.groupId }}</p>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div class="task-info-wrapper" v-if="(getTaskLabels?.length || getTaskMembers?.length)">
              <miniUsers @addMember="saveTaskMembers" v-if="task.memberIds?.length" :memberIds="getTaskMembers" />
              <labelsPreview @updateBoard="updateBoard" @saveLabel="saveTaskLabels" v-if="task.labelIds?.length" :currBoard="currBoard" :labelIds="getTaskLabels" />
            </div>
          </div>
          <div class="task-section">
            <span></span>
            <datePreview v-if="task.dueDate" :dueDate="task.dueDate" :status="task.status"
              @changeStatus="updateTaskStatus" @saveDate="saveTaskDate" @removeDate="removeTaskDate" />
          </div>
          <div class="task-section task-description">
            <span class="description-icon"></span>
            <div class="task-description-wrapper">
              <div class="task-description-title">
                <h3 class="task-mini-title">Description</h3>
                <el-button v-if="task.description?.length" @click="isEdit = true" class="task-btn">Edit</el-button>
              </div>
              <p v-if="!isEdit" contenteditable="true" spellcheck="false" @click="isEdit = true"
                class="description-info" :class="descriptionTxtAreaClass">
                {{ task.description }}
              </p>
              <div v-else class="details-edit">
                <textarea @input="updateTask" v-model="task.description" class="textarea-edit"
                  placeholder="Add a more detailed description..."></textarea>
                <el-button class="add-save-btn" @click="(isEdit = false)" type="primary">Save</el-button>
                <el-button @click="(isEdit = false)">Cancel</el-button>
              </div>
            </div>
          </div>
          <div v-if="task.attachments?.length" class="task-section">
            <span class="attachments-icon"></span>
            <div class="task-attachments">
            <h3 class="task-mini-title">Attachments</h3>
            <div v-for="attachment in task.attachments" class="task-attachment-preview">
            <div v-if="attachment.type" class="img-preview">
            <img class="attachment-img" :src="attachment.link">
            </div>
            <div v-else class="attachment-preview">
            <span class="attachment-icon"></span>
            </div>
            <div class="attachment-info">
              <p>{{ attachment.name ||attachment.link}}</p>
              <p>Created at {{getCreatedTime(attachment.createdAy)}}               <Popper 
                class="popper-btn delete-popper" offsetSkid="116">
                  <button >Remove</button>
                  <template #content="{ close }">
                    <div class="popper-content popper-template">
                      <popperModal :title="'Delete Checklist?'" @closeModal="close" />
                      <div class="content">
                        <p>Deleting a attachment is permanent and there is no way to get it back.</p>
                        <el-button
                          @click="removeAttachment(attachment.id)" 
                          class="task-btn delete-btn">
                          Delete attachment
                        </el-button>
                      </div>
                    </div>
                  </template>
              </Popper><Popper> 
                  <button>Edit</button>
                  <template #content="{ close }">
                    <div class="popper-content popper-template">
                      <popperModal :title="'Edit Attachment'" @closeModal="close" />
                      <div class="content add-attachment">
                        <input class="attach-link-input" v-model="attachment.link">
                        <p>Link name (optional)</p>
                        <input class="attach-link-input" v-model="attachment.name">
                        <el-button class="attach-link-button" @click="updateAttachment(attachment)">Update</el-button>
                      </div>
                    </div>
                  </template>
              </Popper>  </p>
            </div>
            </div>
            </div>
          </div>
          <div v-if="task.checklists" v-for="checklist in task.checklists" class="task-section task-todo checklist">
            <span class="checklist-icon"></span>
              <div class="task-mini-title checklist-title">
                <div v-if="(currChecklist.id === checklist.id && currChecklist.isEditTitle)" class="todo-edit">
                  <textarea class="textarea-edit-checklist" v-model="currChecklist.title" ref="checklistTitle"
                    @input="updateCurrChecklisInput" @keyup.enter="updateCurrChecklisTitle(checklist.id)">
                  </textarea>
                  <div class="edit-checklist">
                    <el-button @click="updateCurrChecklisTitle(checklist.id)" class="add-save-btn" type="primary">
                      Save
                    </el-button>
                    <button>
                      <font-awesome-icon @click="openEditChecklist(checklist.id, false)" class="close-add-task-btn"
                        icon="fa-solid fa-xmark" />
                    </button>
                  </div>
                </div>
                <div v-else class="task-checklist-title">
                  <h3 @click="openEditChecklist(checklist.id, true)" class="task-mini-title checklist-title">{{ checklist.title }}</h3>
                  <Popper
                    class="popper-btn delete-popper" offsetSkid="116">
                    <el-button class="task-btn">Delete</el-button>
                    <template #content="{ close }">
                      <div class="popper-content popper-template">
                        <popperModal :title="'Delete Checklist?'" @closeModal="close" />
                        <div class="content">
                          <p>Deleting a checklist is permanent and there is no way to get it back.</p>
                          <el-button @click="deleteChecklist(checklist.id)" class="task-btn delete-btn">
                            Delete checklist
                          </el-button>
                        </div>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
            <div class="progress-container">
              <el-progress :percentage="checklistPercentage(checklist.id)"
                :color="checklistPercentage(checklist.id) === 100 ? '#61bd4f' : '#5ba4cf'" :width=200>
              </el-progress>
            </div>
            <ul class="checklist">
              <li v-for="todo in checklist.todos" :key="todo.id" class="todo">
                <input class="checkbox-helper" type="checkbox" :checked="todo.isDone"
                  @input="onTodoIsDoneChanged(checklist.id, todo.id, $event)" />
                <div class="todo-content"
                  :class="(currChecklist.todo.isEditTodo && currChecklist.todo.id === todo.id) ? 'edit-todo-content' : ''">
                  <div v-if="(currChecklist.todo.id === todo.id && currChecklist.todo.isEditTodo)" class="todo-edit">
                    <textarea class="textarea-edit-checklist edit-todo" v-model="currChecklist.todo.title"
                      ref="checklistTodoTitle" @input="updateCurrTodoTitleInput"
                      @keyup.enter="updateCurrTodoTitle(checklist.id, todo.id)">
                    </textarea>
                  </div>
                  <div class="edit-checklist"
                    v-if="(currChecklist.todo.id === todo.id && currChecklist.todo.isEditTodo)">
                    <el-button @click="updateCurrTodoTitle(checklist.id, todo.id)" class="add-save-btn" type="primary">
                      Save
                    </el-button>
                    <button>
                      <font-awesome-icon @click="onEditChecklistTodo(checklist.id, todo.id, false)"
                        class="close-add-task-btn" icon="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div
                    v-if="(!currChecklist.todo.id || currChecklist.todo.id !== todo.id || (currChecklist.todo.id === todo.id && !currChecklist.todo.isEditTodo))"
                    @click="onEditChecklistTodo(checklist.id, todo.id, true)" class="todo-edit">
                    <p :style="todo.isDone ? { textDecoration: 'line-through' } : ''">{{ todo.title }}</p>
                  </div>
                  <popperEditOptions deleteTitle="Delete" requestedTitle="Item actions" @delete="deleteChecklistTodo(checklist.id, todo.id)"/>
                </div>
              </li>
              <button
                v-if="currChecklist.id === checklist.id && !currChecklist.isAddItem || currChecklist.id !== checklist.id"
                class="btn-add" @click="updateTxtAddTodo(checklist.id, true)">
                Add an item
              </button>
              <div v-if="currChecklist.id === checklist.id && currChecklist.isAddItem" class="todo-edit add-todo">
                <textarea @keyup.enter="addChecklistTodo()" class="textarea-edit" v-model="currChecklist.task"
                  ref="todoTxtarea" @input="updateCurrTaskInfo" placeholder="Add an item">
                  </textarea>
                <el-button class="add-save-btn" @click="addChecklistTodo()" type="primary">Add</el-button>
                <el-button @click="updateTxtAddTodo(checklist.id, false)">Cancel</el-button>
              </div>
            </ul>
          </div>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3 class="task-mini-title">Activity</h3>
              <el-button class="task-btn" @click="(showComments = !showComments)">{{ showComments ? 'Hide Details' :
                  'Show details'
              }}</el-button>
            </div>
            <font-awesome-icon icon="fa-regular fa-user" />
            <div>
              <input placeholder="Write a comment..." spellcheck="false" class="activity-comment" />
            </div>
          </div>
          <div v-for="comment in task.comments" v-if="showComments" class="task-section">
            <img :src="comment.byMember.imgUrl" class="member-img">
            <div class="task-comment">
              <div class="member-info">
                <p class="comment-sender">{{ comment.byMember.fullname }}</p>
                <p>{{ comment.txt }}</p>
              </div>
              <a>{{ getCommentTime(comment.createdAt) }}</a>
            </div>
          </div>
        </section>
        <section class="actions">
          <h3 class="mini-title">Add to card</h3>
          <div class="task-actions">
            <memberPicker @addMember="saveTaskMembers" :members="getTaskMembers" />
            <labelPicker @updateBoard="updateBoard" @saveLabel="saveTaskLabels" :labelIds="getTaskLabels" />
            <checkList @addchecklist="addChecklist" />
            <datePicker :taskDate="getTaskDate" @saveDate="saveTaskDate" @removeDate="removeTaskDate" />
            <addAttachment @addAttachment="addAttachment" />
            <coverPicker @setCover="saveTaskCover" />
            <archiveTask @archiveTask="archiveTask" @deleteTask="deleteTask" @restoreTask="restoreTask" :task="task" />
            <div @click="toggleWatch" class="task-option-btn" :class="task.isWatched? 'watched' : ''">
              <span class="watch-icon icon-actions"></span>
             <p>Watch <span class="check-icon-container" v-if="task.isWatched"><span class="check-icon"></span></span></p>
            </div>
          </div>
        </section>
      </section>

      <span @click="exitTask" class="task-exit-btn"> <svg class="margin" width="18" height="18" viewBox="0 0 20 13"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
            fill="grey"></path>
        </svg></span>
    </div>
  </div>
</template>

<script>
import dateFormat, { masks } from "dateformat";
import labelPicker from "../cmps/label-picker.vue"
import memberPicker from "../cmps/member-picker.vue"
import checkList from "../cmps/check-list.vue"
import datePicker from "../cmps/date-picker.vue"
import coverPicker from "../cmps/cover.picker.vue"
import miniUsers from "../cmps/mini-users.vue"
import addAttachment from "../cmps/add-attachment.vue"
import labelsPreview from "../cmps/labels-preview.vue"
import archiveTask from "../cmps/archive-task.vue"
import datePreview from "../cmps/date-preview.vue";
import { utilService } from "../services/util.service";
import popperModal from "../cmps/popper-modal.vue";
import popperEditOptions from "../cmps/popper-edit-options.vue";

export default {
  props: {
    currBoard: Object,
  },
  async created() {
    let { taskId } = this.$route.params
    let task = await this.$store.dispatch({
      type: "loadTask",
      board: this.currBoard,
      taskId,
    })
    this.task = JSON.parse(JSON.stringify(task))
  },
  data() {
    return {
      groupId: "",
      task: {},
      showComments: false,
      isEdit: false,
      currChecklist: {
        id: null,
        isAddItem: false,
        task: "",
        isEditTitle: false,
        todo: {
          id: null,
          title: "",
          isEditTodo: false
        }
      },
    }

  },
  methods: {
    exitTask() {
      this.$router.push(`/board/${this.currBoard._id}`)
    },
    toggleDetails() {
      this.isDetailsShown = !this.isDetailsShown
    },
    async updateTask() {
      try {
        let board = JSON.parse(JSON.stringify(this.currBoard))
        let taskIdx
        let groupIdx = board.groups.findIndex((group) =>
          group.tasks.some((task, idx) => {
            if (task.id === this.task.id) taskIdx = idx
            return task.id === this.task.id
          })
        )
        board.groups[groupIdx].tasks[taskIdx] = this.task
        console.log(board.groups[groupIdx].tasks[taskIdx]);
        await this.$store.dispatch({ type: "updateBoard", board })
      } catch (err) {
        console.log("cant Update task", err)
      }
    },
    closeModal() {
      this.$router.push("/board")
    },
    addLabel(labels) {
      this.task.labels = labels
      this.updateTask()
    },
    archiveTask() {
      this.task.archivedAt = Date.now()
      this.updateTask()
    },
    restoreTask() {
      delete this.task.archivedAt
      this.updateTask()
    },
    async deleteTask() {
      try {
        await this.$store.dispatch({ type: "deleteTask", board: this.currBoard, taskId: this.task.id })
        this.exitTask()
      }
      catch (err) {
        console.log(err)
      }
    },
    addAttachment(attachment) {
      if (!this.task.attachments) this.task.attachments = []
      this.task.attachments.push(attachment)
      this.updateTask()
    },
    addMember(members) {
      this.task.members = members
      this.updateTask()
    },
    saveTaskLabels(labels) {
      console.log(labels)
      this.task.labelIds = labels
      this.updateTask()
    },
    saveTaskCover(color, mode = "") {
      if (color.charAt(0) === '#') this.task.style = { bgColor: color , mode}
      else this.task.style = { imgUrl: color , mode}
      // console.log(color);
      // this.task.style = { bgColor: color }
      this.updateTask()
    },
    updateTaskStatus(status) {
      this.task.status = status
      this.updateTask()
    },
    saveTaskMembers(members) {
      this.task.memberIds = members
      this.updateTask()
    },
    saveTaskDate(date) {
      this.task.dueDate = date
      this.updateTask();
    },
    removeTaskDate(date) {
      this.task.dueDate = ''
      this.updateTask();
    },
    addChecklist(checklistsTitle) {
      const checklist = {
        id: utilService.makeId(),
        title: checklistsTitle,
        todos: []
      }
      this.task.checklists.push(checklist)
      this.updateTask()
    },
    deleteChecklist(checklistsId) {
      const idx = this.task.checklists.findIndex(checklist => checklist.id === checklistsId)
      this.task.checklists.splice(idx, 1)
      this.updateTask()
    },
    deleteChecklistTodo(checklistsId, todoId) {
      const idx = this.task.checklists.find(checklist => checklist.id === checklistsId).todos.findIndex(todo => todo.id === todoId)
      this.task.checklists.find(checklist => checklist.id === checklistsId).todos.splice(idx, 1)
      this.updateTask()
    },
    addChecklistTodo() {
      if (this.currChecklist.task === "") return
      this.task.checklists.find(checklist => checklist.id === this.currChecklist.id).todos.push(
        {
          id: utilService.makeId(),
          title: this.currChecklist.task,
          isDone: false
        },
      )
      setTimeout(() => {
        this.$refs.todoTxtarea[0].focus()
      }, 50)
      this.currChecklist.task = ""
      this.updateTask()
    },
    updateBoard(board) {
      this.$store.dispatch({ type: "updateBoard", board })
    },
    updateTxtAddTodo(checklistId, isAddItem) {
      if (isAddItem) {
        setTimeout(() => {
          this.$refs.todoTxtarea[0].focus()
        }, 50)
      }
      this.currChecklist.id = checklistId
      this.currChecklist.isAddItem = isAddItem
    },
    updateCurrTaskInfo(ev) {
      this.currChecklist.task = ev.target.value
    },
    openEditChecklist(checklistId, isEditTitle) {
      this.currChecklist.todo.isEditTodo = false
            setTimeout(() => {
        this.$refs.checklistTitle[0].focus()
      }, 50)
      this.currChecklist.id = checklistId
      this.currChecklist.title = this.task.checklists.find(checklist => checklist.id === checklistId).title
      this.currChecklist.isEditTitle = isEditTitle
    },
    updateCurrChecklisInput(ev) {
      this.currChecklist.title = ev.target.value
    },
    updateCurrChecklisTitle(checklistId) {
      this.task.checklists.find(checklist => checklist.id === checklistId).title = this.currChecklist.title
      this.currChecklist.isEditTitle = false
      this.updateTask()
    },
    onEditChecklistTodo(checklistId, todoId, isEditTodo) {
      this.currChecklist.isEditTitle = false
      setTimeout(() => {
        this.$refs.checklistTodoTitle[0].focus()
      }, 50)
      this.currChecklist.id = checklistId
      this.currChecklist.todo.id = todoId
      this.currChecklist.todo.isEditTodo = isEditTodo
      this.currChecklist.todo.title = this.task.checklists.find(checklist => checklist.id === checklistId)
        .todos.find(todo => todo.id === todoId).title
    },
    updateCurrTodoTitleInput(ev) {
      this.currChecklist.todo.title = ev.target.value
    },
    updateCurrTodoTitle(checklistId, todoId) {
      this.task.checklists.find(checklist => checklist.id === checklistId).todos.find(todo => todo.id === todoId).title = this.currChecklist.todo.title
      this.currChecklist.todo.isEditTodo = false
      this.updateTask()
    },
    onTodoIsDoneChanged(checklistId, todoId, ev) {
      const isChecked = ev.target.checked
      this.task.checklists.find(checklist => checklist.id === checklistId).todos.find(
        todo => todo.id === todoId
      ).isDone = isChecked
      this.updateTask()
    },
    checklistPercentage(checklistId) {
      const allTasks = this.task.checklists.find(checklist => checklist.id === checklistId).todos.length
      const doneTasks = this.task.checklists.find(checklist => checklist.id === checklistId).todos.filter(
        todo => todo.isDone).length
      return Math.round((doneTasks / allTasks) * 100)
    },
    getCommentTime(ts) {
      if (ts - Date.now() < 86349893 && ts - Date.now() > 0) return dateFormat(new Date(ts), "'Before' H 'hours'");
      return dateFormat(new Date(ts), "mmm dd 'at' HH:MM");
    },
    getCreatedTime(ts) {
      if (ts - Date.now() < 86349893 && ts - Date.now() > 0) return dateFormat(ts, "'Before' H 'hours'");
      return dateFormat(ts, "mmm dd 'at' HH:MM");
    },
    removeAttachment(attachId){
      const attachIdx =  this.task.attachments.findIndex(attach => attach.id === attachId)
      this.task.attachments.splice(attachIdx,1)
      this.updateTask()
    },
    updateAttachment(attachment){
      console.log(attachment);
      const attachIdx =  this.task.attachments.findIndex(attach => attach.id === attachment.id)
      this.task.attachments.splice(attachIdx,1,attachment)
      this.updateTask()
    },
    toggleWatch(){
      this.task.isWatched = !this.task.isWatched
      this.updateTask()
    }
  },
  computed: {
    getTaskLabels() {
      return this.task.labelIds
    },
    getTaskMembers() {
      return this.task.memberIds
    },
    getTaskDate() {
      return this.task.dueDate;
    },
    descriptionTxtAreaClass() {
      return this.task.description ? 'description-info-full' : ''
    }
  },
  components: {
    labelPicker,
    memberPicker,
    checkList,
    datePicker,
    coverPicker,
    miniUsers,
    labelsPreview,
    addAttachment,
    archiveTask,
    datePreview,
    popperModal,
    popperEditOptions
  },
}
</script>

<style lang="scss">

</style>
