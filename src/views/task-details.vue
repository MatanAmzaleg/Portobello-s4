<template>
  <div class="task-edit-screen" @click="exitTask">
    <div v-if="task" class="task-edit-container" @click.stop>
      <div
        v-if="isCover"
        class="task-cover"
        :style="
          task.style?.bgColor
            ? { 'background-color': task.style.bgColor }
            : { 'background-image': 'url( ' + task.style.imgUrl + ')' }
        "
      >
        <Popper offsetDistance="-2" offsetSkid="62" placement="top">
          <div class="task-cover-add-cover">
            <span class="add-cover-icon"></span>
            <p>Cover</p>
          </div>
          <template #content="{ close }">
            <popperCover
              @closeModal="close"
              @setCover="saveTaskCover"
              :style="task.style"
            />
          </template>
        </Popper>
      </div>
      <div class="task-section task-title">
        <span class="header-icon"></span>
        <div class="task-title-wrapper">
          <input
            v-model="task.title"
            @input="updateTask"
            class="task-title-input"
            type="text"
          />
          <p>
            in list <span>{{ getTaskGroup }}</span>
          </p>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div
              class="task-info-wrapper"
              v-if="getTaskLabels?.length || getTaskMembers?.length"
            >
              <miniUsers
                @addMember="saveTaskMembers"
                v-if="task.memberIds?.length"
                :memberIds="getTaskMembers"
              />
              <labelsPreview
                @updateBoard="updateBoard"
                @saveLabel="saveTaskLabels"
                v-if="task.labelIds?.length"
                :currBoard="currBoard"
                :labelIds="getTaskLabels"
              />
            </div>
          </div>
          <div class="task-section">
            <span></span>
            <datePreview
              v-if="task.dueDate"
              :dueDate="task.dueDate"
              :status="task.status"
              @changeStatus="updateTaskStatus"
              @saveDate="saveTaskDate"
              @removeDate="removeTaskDate"
            />
          </div>
          <div class="task-section task-description">
            <span class="description-icon"></span>
            <div class="task-description-wrapper">
              <div class="task-description-title">
                <h3 class="task-mini-title">Description</h3>
                <el-button
                  v-if="task.description?.length"
                  @click="isEdit = true"
                  class="task-btn"
                  >Edit</el-button
                >
              </div>
              <p
                v-if="!isEdit"
                contenteditable="true"
                spellcheck="false"
                @click="descriptionEditMode"
                class="description-info"
                :class="descriptionTxtAreaClass"
              >
                {{ task.description }}
              </p>
              <div v-else class="details-edit">
                <textarea
                  ref="focusInput"
                  @input="updateTask"
                  v-model="task.description"
                  class="textarea-edit"
                  placeholder="Add a more detailed description..."
                ></textarea>
                <el-button
                  class="add-save-btn"
                  @click="isEdit = false"
                  type="primary"
                  >Save</el-button
                >
                <el-button @click="isEdit = false">Cancel</el-button>
              </div>
            </div>
          </div>
          <div v-if="task.attachments?.length" class="task-section">
            <span class="attachments-icon"></span>
            <div class="task-attachments">
              <h3 class="task-mini-title">Attachments</h3>
              <div
                v-for="attachment in task.attachments"
                class="task-attachment-preview"
              >
                <div v-if="attachment.type" class="img-preview">
                  <img class="attachment-img" :src="attachment.link" />
                </div>
                <div v-else class="attachment-preview">
                  <span class="attachment-icon"></span>
                </div>
                <div class="attachment-info">
                  <p>{{ attachment.name || attachment.link }}</p>
                  <p>
                    Created at {{ getCreatedTime(attachment.createdAy) }}
                    <Popper class="popper-btn delete-popper" offsetSkid="116">
                      <button class="attachment-btn">Delete</button>
                      <template #content="{ close }">
                        <div class="popper-content popper-template">
                          <popperModal
                            :title="'Delete Checklist?'"
                            @closeModal="close"
                          />
                          <div class="content">
                            <p>
                              Deleting a attachment is permanent and there is no
                              way to get it back.
                            </p>
                            <el-button
                              @click="removeAttachment(attachment.id)"
                              class="task-btn delete-btn"
                            >
                              Delete attachment
                            </el-button>
                          </div>
                        </div>
                      </template>
                    </Popper>
                    <Popper>
                      <button class="attachment-btn">Edit</button>
                      <template #content="{ close }">
                        <div
                          class="popper-content popper-template label-picker"
                        >
                          <popperModal
                            :title="'Edit Attachment'"
                            @closeModal="close"
                          />
                          <div class="content add-attachment">
                            <input
                              class="attach-link-input"
                              v-model="attachment.link"
                            />
                            <p>Link name (optional)</p>
                            <input
                              class="attach-link-input"
                              v-model="attachment.name"
                            />
                            <el-button
                              class="attach-link-button"
                              @click="updateAttachment(attachment)"
                              >Update</el-button
                            >
                          </div>
                        </div>
                      </template>
                    </Popper>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Container @drop="onColumnDrop($event, task.checklists)">
            <Draggable
              v-if="task.checklists"
              v-for="checklist in task.checklists"
              class="task-section task-todo checklist"
            >
              <span class="checklist-icon"></span>
              <div class="task-mini-title checklist-title">
                <div
                  v-if="
                    currChecklist.id === checklist.id &&
                    currChecklist.isEditTitle
                  "
                  class="todo-edit"
                >
                  <textarea
                    class="textarea-edit-checklist"
                    v-model="currChecklist.title"
                    ref="checklistTitle"
                    @input="updateCurrChecklisInput"
                    @keyup.enter="updateCurrChecklisTitle(checklist.id)"
                  >
                  </textarea>
                  <div class="edit-checklist">
                    <el-button
                      @click="updateCurrChecklisTitle(checklist.id)"
                      class="add-save-btn"
                      type="primary"
                    >
                      Save
                    </el-button>
                    <button>
                      <font-awesome-icon
                        @click="openEditChecklist(checklist.id, false)"
                        class="close-add-task-btn"
                        icon="fa-solid fa-xmark"
                      />
                    </button>
                  </div>
                </div>
                <div v-else class="task-checklist-title">
                  <h3
                    @click="openEditChecklist(checklist.id, true)"
                    class="task-mini-title checklist-title"
                  >
                    {{ checklist.title }}
                  </h3>
                  <Popper class="popper-btn delete-popper" offsetSkid="116">
                    <el-button class="task-btn">Delete</el-button>
                    <template #content="{ close }">
                      <div class="popper-content popper-template">
                        <popperModal
                          :title="'Delete Checklist?'"
                          @closeModal="close"
                        />
                        <div class="content">
                          <p>
                            Deleting a checklist is permanent and there is no
                            way to get it back.
                          </p>
                          <el-button
                            @click="deleteChecklist(checklist.id)"
                            class="task-btn delete-btn"
                          >
                            Delete checklist
                          </el-button>
                        </div>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
              <div class="progress-container">
                <el-progress
                  :percentage="checklistPercentage(checklist.id)"
                  :color="
                    checklistPercentage(checklist.id) === 100
                      ? '#61bd4f'
                      : '#5ba4cf'
                  "
                  :width="200"
                >
                </el-progress>
              </div>
              <Container
                class="checklist flex-grow overflow-y-auto overflow-x-hidden"
                orientation="vertical"
                :get-child-payload="getCardPayload(checklist.id)"
                :drop-placeholder="{
                  className: `bg-primary bg-opacity-20  
            border-dotted border-2 
            border-primary rounded-lg mx-4 my-2`,
                  animationDuration: '200',
                  showOnTop: true,
                }"
                drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
                drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
                @drop="(e) => onCardDrop(checklist.id, e)"
              >
                <Draggable
                  v-for="todo in checklist.todos"
                  :key="todo.id"
                  class="todo"
                >
                  <input
                    class="checkbox-helper"
                    type="checkbox"
                    :checked="todo.isDone"
                    @input="onTodoIsDoneChanged(checklist.id, todo.id, $event)"
                  />
                  <div
                    class="todo-content"
                    :class="
                      currChecklist.todo.isEditTodo &&
                      currChecklist.todo.id === todo.id
                        ? 'edit-todo-content'
                        : ''
                    "
                  >
                    <div
                      v-if="
                        currChecklist.todo.id === todo.id &&
                        currChecklist.todo.isEditTodo
                      "
                      class="todo-edit"
                    >
                      <textarea
                        class="textarea-edit-checklist edit-todo"
                        v-model="currChecklist.todo.title"
                        ref="checklistTodoTitle"
                        @input="updateCurrTodoTitleInput"
                        @keyup.enter="
                          updateCurrTodoTitle(checklist.id, todo.id)
                        "
                      >
                      </textarea>
                    </div>
                    <div
                      class="edit-checklist"
                      v-if="
                        currChecklist.todo.id === todo.id &&
                        currChecklist.todo.isEditTodo
                      "
                    >
                      <el-button
                        @click="updateCurrTodoTitle(checklist.id, todo.id)"
                        class="add-save-btn"
                        type="primary"
                      >
                        Save
                      </el-button>
                      <button>
                        <font-awesome-icon
                          @click="
                            onEditChecklistTodo(checklist.id, todo.id, false)
                          "
                          class="close-add-task-btn"
                          icon="fa-solid fa-xmark"
                        />
                      </button>
                    </div>
                    <div
                      v-if="
                        !currChecklist.todo.id ||
                        currChecklist.todo.id !== todo.id ||
                        (currChecklist.todo.id === todo.id &&
                          !currChecklist.todo.isEditTodo)
                      "
                      @click="onEditChecklistTodo(checklist.id, todo.id, true)"
                      class="todo-edit"
                    >
                      <p
                        :style="
                          todo.isDone ? { textDecoration: 'line-through' } : ''
                        "
                      >
                        {{ todo.title }}
                      </p>
                    </div>
                    <popperEditOptions
                      deleteTitle="Delete"
                      requestedTitle="Item actions"
                      @delete="deleteChecklistTodo(checklist.id, todo.id)"
                    />
                  </div>
                </Draggable>
                <button
                  v-if="
                    (currChecklist.id === checklist.id &&
                      !currChecklist.isAddItem) ||
                    currChecklist.id !== checklist.id
                  "
                  class="btn-add"
                  @click="updateTxtAddTodo(checklist.id, true)"
                >
                  Add an item
                </button>
                <div
                  v-if="
                    currChecklist.id === checklist.id && currChecklist.isAddItem
                  "
                  class="todo-edit add-todo"
                >
                  <textarea
                    @keyup.enter="addChecklistTodo()"
                    class="textarea-edit"
                    v-model="currChecklist.task"
                    ref="todoTxtarea"
                    @input="updateCurrTaskInfo"
                    placeholder="Add an item"
                  >
                  </textarea>
                  <el-button
                    class="add-save-btn"
                    @click="addChecklistTodo()"
                    type="primary"
                    >Add</el-button
                  >
                  <el-button @click="updateTxtAddTodo(checklist.id, false)"
                    >Cancel</el-button
                  >
                </div>
              </Container>
            </Draggable>
          </Container>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3 class="task-mini-title">Activity</h3>
              <el-button
                class="task-btn"
                @click="showComments = !showComments"
                >{{ showComments ? "Hide Details" : "Show details" }}</el-button
              >
            </div>
            <img
              :src="this.$store.getters.loggedinUser?.imgUrl"
              class="member-img"
            />
            <div>
              <div class="add-comment-frame">
                <div class="add-comment-box">
                  <Mentionable :keys="['@']" :items="boardMembers" insert-space>
                    <textarea
                      @click="toggleComment"
                      v-model="userInput"
                      placeholder="Write a comment..."
                      class="activity-comment"
                      :class="isComment ? 'open' : ''"
                    />
                    <template #no-result>
                      <div class="dim">No result</div>
                    </template>
                    <template #item-@="{ item }">
                      <div class="mention-user">
                        <img class="member-img" :src="item.imgUrl" />
                        {{ item.fullname }}
                        <span class="dim"> ({{ item.value }}) </span>
                      </div>
                    </template>
                  </Mentionable>
                  <el-button
                    @click="addComment"
                    class="btn"
                    :class="getBtnClass"
                    v-if="isComment"
                    >Save</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            v-for="comment in task.comments"
            v-if="showComments"
            class="task-section"
          >
            <img :src="comment.byMember.imgUrl" class="member-img" />
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
            <memberPicker
              @addMember="saveTaskMembers"
              :members="getTaskMembers"
            />
            <labelPicker
              @updateBoard="updateBoard"
              @saveLabel="saveTaskLabels"
              :labelIds="getTaskLabels"
            />
            <checkList @addchecklist="addChecklist" />
            <datePicker
              :taskDate="getTaskDate"
              @saveDate="saveTaskDate"
              @removeDate="removeTaskDate"
            />
            <addAttachment @addAttachment="addAttachment" />
            <coverPicker
              v-if="!task.style?.mode"
              :style="getTaskStyle"
              @setCover="saveTaskCover"
            />
            <archiveTask
              @archiveTask="archiveTask"
              @deleteTask="deleteTask"
              @restoreTask="restoreTask"
              :task="task"
            />
            <div
              @click="toggleWatch"
              class="task-option-btn"
              :class="task.isWatched ? 'watched' : ''"
            >
              <span class="watch-icon icon-actions"></span>
              <div class="watch-container">
                <p>Watch</p>
                <span v-if="task.isWatched" class="check-icon"></span>
              </div>
            </div>
          </div>
        </section>
      </section>
      <span @click="exitTask" class="task-exit-btn">
        <span class="task-exit-icon"></span>
      </span>
    </div>
  </div>
</template>

<script>
import dateFormat, { masks } from "dateformat";
import memberPicker from "../cmps/member-picker.vue";
import popperCover from "../cmps/popper-cover.vue";
import labelPicker from "../cmps/label-picker.vue";
import checkList from "../cmps/check-list.vue";
import datePicker from "../cmps/date-picker.vue";
import coverPicker from "../cmps/cover.picker.vue";
import miniUsers from "../cmps/mini-users.vue";
import addAttachment from "../cmps/add-attachment.vue";
import labelsPreview from "../cmps/labels-preview.vue";
import archiveTask from "../cmps/archive-task.vue";
import datePreview from "../cmps/date-preview.vue";
import { utilService } from "../services/util.service";
import popperModal from "../cmps/popper-modal.vue";
import popperEditOptions from "../cmps/popper-edit-options.vue";
import { now } from "lodash";
import { Mentionable } from "vue-mention";
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag, generateItems, generateWords } from "../utils/helpers";

export default {
  props: {
    currBoard: Object,
  },
  async created() {
    let { taskId } = this.$route.params;
    let task = await this.$store.dispatch({
      type: "loadTask",
      board: this.currBoard,
      taskId,
    });
    this.task = JSON.parse(JSON.stringify(task));
  },
  data() {
    return {
      groupId: "",
      task: {},
      showComments: false,
      isEdit: false,
      userInput: null,
      isComment: false,
      currChecklist: {
        id: null,
        isAddItem: false,
        task: "",
        isEditTitle: false,
        todo: {
          id: null,
          title: "",
          isEditTodo: false,
        },
      },
    };
  },
  methods: {
    exitTask() {
      this.$router.push(`/board/${this.currBoard._id}`);
    },
    toggleDetails() {
      this.isDetailsShown = !this.isDetailsShown;
    },
    async updateTask() {
      try {
        let board = JSON.parse(JSON.stringify(this.currBoard));
        let taskIdx;
        let groupIdx = board.groups.findIndex((group) =>
          group.tasks.some((task, idx) => {
            if (task.id === this.task.id) taskIdx = idx;
            return task.id === this.task.id;
          })
        );
        board.groups[groupIdx].tasks[taskIdx] = this.task;
        if (this?.task?.lastActivity)
          board.activities.unshift(this.task.lastActivity);
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log("cant Update task", err);
      }
    },
    closeModal() {
      this.$router.push("/board");
    },
    archiveTask() {
      this.task.archivedAt = Date.now();
      this.task.lastActivity = {
        msg: `Archived ${this.task.title} `,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    restoreTask() {
      delete this.task.archivedAt;
      this.task.lastActivity = {
        msg: `Sent ${this.task.title} back to board`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    async deleteTask() {
      try {
        await this.$store.dispatch({
          type: "deleteTask",
          board: this.currBoard,
          taskId: this.task.id,
        });
        this.exitTask();
      } catch (err) {
        console.log(err);
      }
    },
    addAttachment(attachment) {
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(attachment);
      this.task.lastActivity = {
        msg: `Added attachment to ${this.task.title} `,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    saveTaskLabels({ labels, msg }) {
      console.log(labels, msg);
      this.task.labelIds = labels;
      this.task.lastActivity = {
        msg: msg + this.task.title,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    saveTaskCover({ color, mode }) {
      if (color?.charAt(0) === "#") this.task.style = { bgColor: color, mode };
      else this.task.style = { imgUrl: color, mode };
      this.task.lastActivity = {
        msg: `Added cover to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    updateTaskStatus(status) {
      this.task.status = status;
      this.updateTask();
    },
    saveTaskMembers({ members, msg }) {
      console.log(members, msg);
      this.task.memberIds = members;
      this.task.lastActivity = {
        msg: msg + this.task.title,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    saveTaskDate(date) {
      this.task.dueDate = date;
      this.task.lastActivity = {
        msg: `Added Due Date to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    removeTaskDate() {
      this.task.dueDate = "";
      this.task.lastActivity = {
        msg: `Removed Due Date to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    addChecklist(checklistsTitle) {
      const checklist = {
        id: utilService.makeId(),
        title: checklistsTitle,
        todos: [],
      };
      this.task.checklists.push(checklist);
      this.task.lastActivity = {
        msg: `Added Checklist to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    deleteChecklist(checklistsId) {
      const idx = this.task.checklists.findIndex(
        (checklist) => checklist.id === checklistsId
      );
      this.task.checklists.splice(idx, 1);
      this.task.lastActivity = {
        msg: `Removed checklist from ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    deleteChecklistTodo(checklistsId, todoId) {
      const idx = this.task.checklists
        .find((checklist) => checklist.id === checklistsId)
        .todos.findIndex((todo) => todo.id === todoId);
      this.task.checklists
        .find((checklist) => checklist.id === checklistsId)
        .todos.splice(idx, 1);
      this.task.lastActivity = {
        msg: `Deleted todo from ${this.task.title} `,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    addChecklistTodo() {
      if (this.currChecklist.task === "") return;
      this.task.checklists
        .find((checklist) => checklist.id === this.currChecklist.id)
        .todos.push({
          id: utilService.makeId(),
          title: this.currChecklist.task,
          isDone: false,
        });
      setTimeout(() => {
        this.$refs.todoTxtarea[0].focus();
      }, 50);
      this.task.lastActivity = {
        msg: `Added todo to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.currChecklist.task = "";
      this.updateTask();
    },
    updateBoard(board) {
      this.$store.dispatch({ type: "updateBoard", board });
    },
    updateTxtAddTodo(checklistId, isAddItem) {
      if (isAddItem) {
        setTimeout(() => {
          this.$refs.todoTxtarea[0].focus();
        }, 50);
      }
      this.currChecklist.id = checklistId;
      this.currChecklist.isAddItem = isAddItem;
    },
    updateCurrTaskInfo(ev) {
      this.currChecklist.task = ev.target.value;
    },
    openEditChecklist(checklistId, isEditTitle) {
      this.currChecklist.todo.isEditTodo = false;
      setTimeout(() => {
        this.$refs.checklistTitle[0].focus();
      }, 50);
      this.currChecklist.id = checklistId;
      this.currChecklist.title = this.task.checklists.find(
        (checklist) => checklist.id === checklistId
      ).title;
      this.currChecklist.isEditTitle = isEditTitle;
    },
    updateCurrChecklisInput(ev) {
      this.currChecklist.title = ev.target.value;
    },
    updateCurrChecklisTitle(checklistId) {
      this.task.checklists.find(
        (checklist) => checklist.id === checklistId
      ).title = this.currChecklist.title;
      this.currChecklist.isEditTitle = false;
      this.updateTask();
    },
    onEditChecklistTodo(checklistId, todoId, isEditTodo) {
      this.currChecklist.isEditTitle = false;
      setTimeout(() => {
        this.$refs.checklistTodoTitle[0].focus();
      }, 50);
      this.currChecklist.id = checklistId;
      this.currChecklist.todo.id = todoId;
      this.currChecklist.todo.isEditTodo = isEditTodo;
      this.currChecklist.todo.title = this.task.checklists
        .find((checklist) => checklist.id === checklistId)
        .todos.find((todo) => todo.id === todoId).title;
    },
    updateCurrTodoTitleInput(ev) {
      this.currChecklist.todo.title = ev.target.value;
    },
    updateCurrTodoTitle(checklistId, todoId) {
      this.task.checklists
        .find((checklist) => checklist.id === checklistId)
        .todos.find((todo) => todo.id === todoId).title =
        this.currChecklist.todo.title;
      this.currChecklist.todo.isEditTodo = false;
      this.task.lastActivity = {
        msg: `Edited todo on ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    onTodoIsDoneChanged(checklistId, todoId, ev) {
      const isChecked = ev.target.checked;
      this.task.checklists
        .find((checklist) => checklist.id === checklistId)
        .todos.find((todo) => todo.id === todoId).isDone = isChecked;
      this.updateTask();
    },
    checklistPercentage(checklistId) {
      const allTasks = this.task.checklists.find(
        (checklist) => checklist.id === checklistId
      ).todos.length;
      const doneTasks = this.task.checklists
        .find((checklist) => checklist.id === checklistId)
        .todos.filter((todo) => todo.isDone).length;
      if (!Math.round((doneTasks / allTasks) * 100)) return 0;
      return Math.round((doneTasks / allTasks) * 100);
    },
    getCommentTime(ts) {
      if (ts - Date.now() < 86349893 && ts - Date.now() > 0)
        return dateFormat(new Date(ts), "'Before' H 'hours'");
      return dateFormat(new Date(ts), "mmm dd 'at' HH:MM");
    },
    getCreatedTime(ts) {
      if (ts - Date.now() < 86349893 && ts - Date.now() > 0)
        return dateFormat(ts, "'Before' H 'hours'");
      return dateFormat(ts, "mmm dd 'at' HH:MM");
    },
    removeAttachment(attachId) {
      const attachIdx = this.task.attachments.findIndex(
        (attach) => attach.id === attachId
      );
      this.task.attachments.splice(attachIdx, 1);
      this.task.lastActivity = {
        msg: `Removed attachment from ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };

      this.updateTask();
    },
    updateAttachment(attachment) {
      const attachIdx = this.task.attachments.findIndex(
        (attach) => attach.id === attachment.id
      );
      this.task.attachments.splice(attachIdx, 1, attachment);
      this.task.lastActivity = {
        msg: `Edited attachment on ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    toggleWatch() {
      let msg = this.task.isWatched ? "Removed watch from " : "Added watch to ";
      this.task.isWatched = !this.task.isWatched;
      this.task.lastActivity = {
        msg: msg + this.task.title,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.updateTask();
    },
    descriptionEditMode() {
      this.isEdit = true;
      this.updateInputFocus;
    },
    updateInputFocus() {
      setTimeout(() => {
        this.$refs.focusInput.focus();
      }, 50);
    },
    toggleComment() {
      this.isComment = !this.isComment;
    },
    addComment() {
      let msg = {
        id: utilService.makeId(),
        txt: this.userInput,
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
      };
      this.task.lastActivity = {
        msg: `Added comment to ${this.task.title}`,
        byMember: this.$store.getters.loggedinUser,
        date: Date.now(),
      };
      this.isComment = false;
      this.userInput = "";
      this.task.comments.push(msg);
      this.updateTask();
    },
    onColumnDrop(dropResult, checkLists) {
      this.task.checklists = applyDrag(this.task.checklists, dropResult);
      let board = JSON.parse(JSON.stringify(this.currBoard));
      let taskIdx;
      let groupIdx = board.groups.findIndex((group) =>
        group.tasks.some((task, idx) => {
          if (task.id === this.task.id) taskIdx = idx;
          return task.id === this.task.id;
        })
      );
      board.groups[groupIdx].tasks[taskIdx] = this.task;
      this.$store.dispatch({ type: "updateBoard", board });
    },
    onCardDrop(columnId, dropResult) {
      let board = JSON.parse(JSON.stringify(this.currBoard));
      let taskIdx;
      let groupIdx = board.groups.findIndex((group) =>
        group.tasks.some((task, idx) => {
          if (task.id === this.task.id) taskIdx = idx;
          return task.id === this.task.id;
        })
      );
      let checklistIdx = this.task.checklists.findIndex(
        (cL) => cL.id === columnId
      );
      let newChecklist = this.task.checklists[checklistIdx];
      newChecklist.todos = applyDrag(newChecklist.todos, dropResult);
      board.groups[groupIdx].tasks[taskIdx] = this.task;
      this.$store.dispatch({ type: "updateBoard", board });
    },
    getCardPayload (columnId) {
      return
    },
  },
  computed: {
    getTaskLabels() {
      return this.task.labelIds;
    },
    getTaskMembers() {
      return this.task.memberIds;
    },
    getTaskDate() {
      return this.task.dueDate;
    },
    descriptionTxtAreaClass() {
      return this.task.description ? "description-info-full" : "";
    },
    getTaskStyle() {
      return this.task.style;
    },
    getTaskGroup() {
      let group = this.currBoard?.groups?.find((group) => {
        if (group.tasks.find((t) => t.id === this.task.id)) return group;
      });
      return group?.title;
    },
    isCover() {
      return this.task.style && Object.keys(this.task.style).length !== 0;
    },
    getBtnClass() {
      return this.userInput?.length > 0 ? "active" : "";
    },
    boardMembers() {
      let boardMembers = JSON.parse(JSON.stringify(this.currBoard.members));
      boardMembers.map((member) => (member.value = member.username));
      return boardMembers;
    },
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
    popperEditOptions,
    popperCover,
    Mentionable,
    Container,
    Draggable,
  },
};
</script>

<style lang="scss"></style>
