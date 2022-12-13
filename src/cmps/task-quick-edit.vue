<template>
  <section class="quick-edit" v-if="isQuickEditOpen">
    <div>
      <section class="task-list task-list-quick">
        <div class="cover" v-if="Object.keys(item.style).length !== 0 && item.style?.mode !== 'full'" :style="
          item.style?.bgColor
            ? { 'background-color': item.style.bgColor }
            : {
              'background-image': 'url( ' + item.style.imgUrl + ')',
              height: '80px',
              'background-position': 'center',
              'background-size': 'cover',
            }
        "></div>
        <div class="cover" v-if="item.style?.mode === 'full'" :style="
          item.style?.bgColor
            ? { 'background-color': item.style.bgColor, height: '56px' }
            : {
              'background-image': 'url( ' + item.style.imgUrl + ')',
              height: '256px',
              'background-position': 'center',
              'background-size': 'cover',
            }
        ">
        </div>
        <section class="task-preview">
          <div class="padded-section">
            <div class="labels" v-if="getTaskLabels?.length > 0">
              <span @click.stop="openLabelExtended" class="label" :class="labelExtendedClass"
                v-for="label in getTaskLabels" :style="{ 'background-color': labelColor(label) }">
                <div class="circle" :style="{ 'background-color': labelColor(label) }"></div>
                <span class="label-title" v-if="isLabelsExtended">{{
                    getLabelTitle(label)
                }}</span>
              </span>
            </div>
            <textarea class="textarea" @input="updateCurrTaskTitle($event)">{{ item.title }}</textarea>
            <div v-if="taskExtra(item)" class="task-preview-info">
              <div class="task-preview-content">
                <span v-if="item.isWatched" class="watch-icon"></span>
                <TaskDatePreview v-if="item.dueDate" :status="item.status" :date="item.dueDate" :taskId="item.id" />
                <span v-if="item.description?.length" class="description-icon"></span>
                <div v-if="item.comments.length > 0" class="task-preview-comments">
                  <span class="comments-icon">
                  </span>
                  <span class="comments-span">{{ item.comments.length }}</span>
                </div>
                <span v-if="item.attachments" class="attachment-icon">
                  <span>{{ item.attachments.length }}</span>
                </span>
                <div class="task-preview-checklist" :class="isDone ? 'done' : ''">
                  <span v-if="item.checklists?.length" class="checklist-icon">
                    <span>{{ getTodoStatus(item.checklists) }}</span>
                  </span>
                </div>
              </div>
              <mini-users-designed :memberIds="item.memberIds"></mini-users-designed>
            </div>
          </div>
        </section>
      </section>
      <button class="save-btn" @click="updateTaskTitle">Save</button>
    </div>
    <div class="actions-quick">
      <button @click="gotoTask(item.id)" class="button-quick-edit">
        <span class="header-icon icon-actions"></span>
        Open card
      </button>
      <Popper @open:popper="addFocus" placement="right">
        <button class="button-quick-edit">
          <span class="label-icon icon-actions"></span>
          Edit labels
        </button>
        <template #content="{ close }">
          <div class="quick-popper-left">
            <popperLabel @closeModal="close" @updateBoard="updateBoard" @saveLabel="saveLabel"
              :labelIds="getTaskLabels" />
          </div>
        </template>
      </Popper>
      <Popper @open:popper="addFocus" placement="right">
        <button class="button-quick-edit">
          <span class="icon-actions member-icon"></span>
          Change Members
        </button>
        <template #content="{ close }">
          <div class="quick-popper-left">
            <popperMember @addMember="addMember" @closeModal="close" :members="getTaskMembers" />
          </div>
        </template>
      </Popper>
      <Popper @open:popper="addFocus" placement="right">
        <button class="button-quick-edit">
          <span class="card-cover-icon icon-actions"></span>
          Change cover
        </button>
        <template #content="{ close }">
          <div class="cover-popper quick-popper-left">
            <popperCover @closeModal="close" @setCover="setCover" :style="style" />
          </div>
        </template>
      </Popper>
      <Popper @open:popper="addFocus" placement="right">
        <button class="button-quick-edit">
          <svg class="icon-actions" width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
              fill="currentColor"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
              fill="currentColor"></path>
          </svg>
          Edit dates
        </button>
        <template #content="{ close }">
          <div class="popper-content label-picker quick-popper-left">
            <popper-calendar @closeModal="close" @removeDate="removeDate" @saveDate="saveDate" :taskDate="task.dueDate" />
          </div>
        </template>
      </Popper>
      <button class="button-quick-edit" @click="deleteTask">
        <span class="archive-icon icon-actions"></span>
        Delete
      </button>
    </div>
  </section>
</template>
<script>
import popperCalendar from "./popper-calendar.vue";
import miniUsersDesigned from "./mini-users-designed.vue";
import miniUsers from "./mini-users.vue";
import TaskDatePreview from "./task-date-preview.vue";
import popperMember from "./popper-member.vue";
import popperLabel from "./popper-label.vue";
import popperCover from "./popper-cover.vue";
import { eventBus } from "../services/event-bus.service";

export default {
  props: {
    item: Object,
    isLabelsExtended: Boolean
  },
  data() {
    return {
      task: {},
      taskTitle: '',
      currBoard: {},
      isDone: null,
      isQuickEditOpen: false,
    };
  },
  async created() {
    this.taskTitle = this.item?.title
    this.task = this.item
    this.currBoard = this.getCurrBoard
    eventBus.on('updateQuickIsOpen', this.updateIsOpen)
    let task = await this.$store.dispatch({
      type: "loadTask",
      board: this.currBoard,
      taskId: this.task.id,
    });
    this.task = JSON.parse(JSON.stringify(task));
  },
  methods: {
    async deleteTask() {
      try {
        await this.$store.dispatch({
          type: "deleteTask",
          board: this.currBoard,
          taskId: this.task.id,
        });
        eventBus.emit('updatePoperIsOpen', false)
      } catch (err) {
        console.log(err);
      }
    },
    updateCurrTaskTitle(ev) {
      this.taskTitle = ev.target.value
    },
    updateTaskTitle() {
      this.task.title = this.taskTitle
      this.updateTask()
      eventBus.emit('updatePoperIsOpen', false)
    },
    updateIsOpen(isOpen) {
      this.isQuickEditOpen = isOpen
    },
    labelColor(id) {
      const label = this.$store.getters.currBoard.labels.find((l) => {
        return l.id === id;
      });
      if (!label) return;
      return label.color;
    },
    labelText(id) {
      const label = this.$store.getters.currBoard.labels.find(
        (l) => l.id === id
      );
      if (!label) return;
      return label.title;
    },
    taskExtra(item) {
      return (
        item.description?.length ||
        item.attachments?.length ||
        item.checklists?.length ||
        item.memberIds?.length ||
        item.dueDate ||
        item.isWatched
      );
    },
    gotoTask(taskId) {
      const boardId = this.$store.getters.currBoard._id
      this.$router.push(`${boardId}/task/${taskId}`)
      eventBus.emit('updatePoperIsOpen', false)
    },
    getTodoStatus(checklists) {
      if (!checklists.length) return;
      let doneTasks = 0;
      checklists.forEach((checklist) => {
        doneTasks += checklist.todos.filter((todo) => todo.isDone).length;
      });
      let allTasks = 0;
      checklists.forEach((checklist) => (allTasks += checklist.todos.length));
      this.isDone = allTasks === doneTasks ? true : false;
      return `${doneTasks}/${allTasks}`;
    },
    getLabelTitle(labelId) {
      const boardLabels = this.currBoard.labels;
      const label = boardLabels.find((l) => l.id === labelId);
      return label.title;
    },
    updateQuickEdit() {
      this.$emit('updateQuickEdit', item.id)
    },
    async updateBoard(board) {
      await this.$store.dispatch({ type: "updateBoard", board });
    },
    async updateTask() {
      try {
        await this.$store.dispatch({type:'updateTask',boardId:this.currBoard._id,task: this.task})
      } catch (err) {
        console.log("cant Update task", err);
      }
    },
    addMember({ members, msg }) {
      this.task.memberIds = members;
      this.task.lastActivity = {
        msg: msg + this.task.title,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask()
    },
    saveLabel({ labels, msg }) {
      this.task.labelIds = labels;
      this.task.lastActivity = {
        msg: msg + this.task.title,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    setCover({ color, mode }) {
      if (color?.charAt(0) === "#") this.task.style = { bgColor: color, mode };
      else this.task.style = { imgUrl: color, mode };
      this.task.lastActivity = {
        msg: `Added cover to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    openLabelExtended(){
      console.log('openLabelExtended')
      this.$emit('openLabelExtended')
    },
    removeDate() {
      this.task.dueDate = "";
      this.task.lastActivity = {
        msg: `Removed Due Date to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    saveDate(date) {
      this.task.dueDate = date
      this.task.lastActivity = {
        msg: `Added Due Date to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    addFocus() {
      eventBus.emit('update-focus')
    },
  },
  computed: {
    getTaskLabels() {
      const labels = JSON.parse(JSON.stringify(this.task.labelIds))
      return labels;
    },
    getTaskMembers() {
      const members = JSON.parse(JSON.stringify(this.task.memberIds))
      return members;
    },
    getTaskDate() {
      return this.task.dueDate;
    },
    getCurrBoard() {
      return this.$store.getters.currBoard;
    },
    style() {
      return this.task.style;
    },
    labelExtendedClass() {
      if (this.isLabelsExtended) return "label-extended";
      return "label";
    },
  },
  components: {
    popperCalendar,
    popperLabel,
    miniUsersDesigned,
    miniUsers,
    TaskDatePreview,
    popperMember,
    popperCover
  },
};
</script>
<style lang="scss">
.task-quick-edit-input {
  height: 100px;

}
</style>
