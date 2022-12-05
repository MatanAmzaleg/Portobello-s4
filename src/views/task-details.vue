<template>
  <div class="task-edit-screen" @click="exitTask">
    <div v-if="task" class="task-edit-container" @click.stop>
      <div v-if="task.style?.bgColor" class="task-cover" :style="{ 'background-color': task.style.bgColor }">
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
              <miniUsers v-if="task.memberIds?.length" :memberIds="getTaskMembers" />
              <labelsPreview v-if="task.labelIds?.length" :currBoard="currBoard" :labelIds="getTaskLabels" />
              </div>
          </div>
          <div class="task-section">
          <span></span>
            <datePreview v-if="task.dueDate" :dueDate="task.dueDate" :status="task.status" @changeStatus="updateTaskStatus" @saveDate="saveTaskDate" @removeDate="removeTaskDate" />
          </div>
          <div class="task-section task-description">
            <span class="description-icon"></span>
            <div class="task-description-wrapper">
              <div class="task-description-title">
                <h3 class="task-mini-title">Description</h3>
                <!-- <el-button v-if="!isEdit" @click="isEdit = true" class="task-btn">Edit</el-button> -->
              </div>
              <p v-if="!isEdit" contenteditable="true" spellcheck="false" @click="isEdit = true"
                class="description-info" :class="descriptionTxtAreaClass">
                {{ task.description }}
              </p>
              <div v-else class="details-edit">
                <textarea @input="updateTask" v-model="task.description" class="textarea-edit"
                  placeholder="Add a more detailed description..."></textarea>
                <el-button @click="(isEdit = false)" type="primary">Save</el-button>
                <el-button @click="(isEdit = false)">Cancel</el-button>
              </div>
            </div>
          </div>
          <div v-if="task.attachments?.length" class="task-section">
            <span class="attachments-icon"></span>
            <h3 class="task-mini-title">Attachments</h3>
          </div>
          <div v-if="task.checklists" v-for="checklist in task.checklists" class="task-section task-todo">
            <span class="checklist-icon"></span>
            <h3 class="task-mini-title checklist-title">{{ checklist.title }}</h3>
            <div class="progress-container">
              <el-progress :percentage="checklistPercentage(checklist.id)"
              :format="checklistFormat" width="200px"></el-progress>
            </div>
            <ul class="checklist">
              <li v-for="todo in checklist.todos" :key="todo.id" class="todo">
                <input class="checkbox-helper" type="checkbox" :checked="todo.isDone" @input="onTodoIsDoneChanged(checklist.id, todo.id, $event)"/>
                {{ todo.title }}
              </li>
              <button
                v-if="currChecklist.id === checklist.id && !currChecklist.isAddItem || currChecklist.id !== checklist.id"
                class="btn-add" @click="updateTxtAddTodo(checklist.id, true)">Add an item</button>
              <div v-if="currChecklist.id === checklist.id && currChecklist.isAddItem" class="todo-edit">
                <textarea class="textarea-edit" v-model="currChecklist.task" ref="todoTxtarea"
                  @input="updateCurrTaskInfo" placeholder="Add an item"></textarea>
                <el-button @click="addTaskChecklistTodo()" type="primary">Add</el-button>
                <el-button @click="updateTxtAddTodo(checklist.id, false)">Cancel</el-button>
              </div>
            </ul>
          </div>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3 class="task-mini-title">Activity</h3>
              <el-button class="task-btn" @click="(showComments = !showComments)">{{ showComments ? 'Hide Details' :
                  'Show Details'
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
          <p class="comment-sender">{{comment.byMember.fullname}}</p>
          <p>{{comment.txt}}</p>
          </div>
          <a>{{getCommentTime(comment.createdAt)}}</a>
          </div>
          </div>
        </section>
        <section class="actions">
          <div class="task-actions">
            <h3 class="mini-title">Add to card</h3>
            <memberPicker @addMember="saveTaskMembers" :members="getTaskMembers" />
            <labelPicker @updateBoard="updateBoard" @saveLabel="saveTaskLabels" :labelIds="getTaskLabels" />
            <checkList @addchecklist="addTaskChecklist" />
            <datePicker :taskDate="getTaskDate" @saveDate="saveTaskDate" @removeDate="removeTaskDate" />
            <addAttachment @addAttachment="addAttachment" />
            <coverPicker @setCover="saveTaskCover" />
            <archiveTask @archiveTask="archiveTask" @deleteTask="deleteTask" @restoreTask="restoreTask" :task="task" />
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
        id: "",
        isAddItem: false,
        task: ""
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
      this.task.labelIds = labels
      this.updateTask()
    },
    saveTaskCover(color) {
      this.task.style = { bgColor: color }
      this.updateTask()
    },
    updateTaskStatus(status) {
      console.log('status',status);
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
    addTaskChecklist(checklistsTitle) {
      const checklist = {
        id: utilService.makeId(),
        title: checklistsTitle,
        todos: []
      }
      this.task.checklists.push(checklist)
      this.updateTask()
    },
    addTaskChecklistTodo() {
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
    updateBoard(board){
      this.$store.dispatch({type:"updateBoard", board})
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
    onTodoIsDoneChanged(checklistId, todoId, ev) {
      const isChecked = ev.target.checked
      this.task.checklists.find(checklist => checklist.id === checklistId).todos.find(
      todo => todo.id === todoId
      ).isDone = isChecked
      this.updateTask()
    },
    checklistPercentage(checklistId){
      const allTasks = this.task.checklists.find(checklist => checklist.id === checklistId).todos.length
      const doneTasks = this.task.checklists.find(checklist => checklist.id === checklistId).todos.filter(
      todo => todo.isDone).length
      return Math.round((doneTasks/ allTasks)  * 100)
    },
    checklistFormat(percentage){
      return percentage? percentage === 100 ? 'Full' : `${percentage}%` : `0%`
    },
    getCommentTime(ts){
      if(ts - Date.now() < 86349893 && ts - Date.now() > 0)  return dateFormat(new Date(ts), "'Before' H 'hours'");
      return dateFormat(new Date(ts), "mmm dd 'at' HH:MM");
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
    descriptionTxtAreaClass(){
      return this.task.description? 'description-info-full' : ''
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
    datePreview
  },
}
</script>

<style lang="scss">

</style>
