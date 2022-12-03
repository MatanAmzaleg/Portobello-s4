<template>
  <div class="task-edit-screen" @click="exitTask">
    <div class="task-edit-container" @click.stop>
      <div
        v-if="task.style?.bgColor"
        class="task-cover"
        :style="{ 'background-color': task.style.bgColor }"
      >
        <span></span>
      </div>
      <div class="task-section task-title">
        <span class="header-icon"></span>
        <div class="task-title-wrapper">
          <input v-model="task.title" @input="updateTask" type="text" />
          <h5>in list {{ this.groupId }}</h5>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div class="task-info-wrapper">
              <miniUsers v-if="task.memberIds" :memberIds="task.memberIds" />
              <labelsPreview
                v-if="task.labelIds"
                :currBoard="currBoard"
                :labelIds="task.labelIds"
              />
            </div>
          </div>
          <div class="task-section task-description">
            <span class="description-icon"></span>
            <div class="task-description-wrapper">
            <div class="task-description-title">
              <h3>Description</h3>
              <el-button class="task-btn">Edit</el-button>
            </div>
              <p
            contenteditable="true"
            spellcheck="false"
            class="description-info"
          >
            {{ task.description }}
          </p>
            </div>
          </div>
          <div class="task-section task-todo"></div>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3>Activity</h3>
              <el-button class="task-btn"  @click="(showComments = !showComments)">{{showComments ? 'Hide Details':'Show Details'}}</el-button>
            </div>
              <font-awesome-icon icon="fa-regular fa-user" />
            <div>
              <input
          placeholder="Write a comment..."
          spellcheck="false"
          class="activity-comment"
        />
            </div>
          </div>
            <div v-if="showComments" class="task-comments">HELLO</div>
        </section>
        <section class="actions">
          <div class="task-actions">
            <labelPicker @saveLabel="saveTaskLabels" :labelIds="getTaskLabels" />
            <memberPicker />
            <datePicker />
            <coverPicker @setCover="saveTaskCover" />
          </div>
        </section>
      </section>

      <span @click="exitTask" class="task-exit-btn"><span>X</span></span>
    </div>
  </div>
</template>

<script>
import labelPicker from "../cmps/label-picker.vue";
import memberPicker from "../cmps/member-picker.vue";
import datePicker from "../cmps/date-picker.vue";
import coverPicker from "../cmps/cover.picker.vue";
import miniUsers from "../cmps/mini-users.vue";
import labelsPreview from "../cmps/labels-preview.vue";
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
        console.log(board);
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log("cant Update task", err);
      }
    },
    closeModal() {
      this.$router.push("/board");
    },
    addLabel(labels) {
      this.task.labels = labels;
      this.updateTask()
    },
    addMember(members) {
      this.task.members = members;
      this.updateTask()
    },
    saveTaskLabels(labels) {
      this.task.labelIds = labels;
      this.updateTask();
    },
    saveTaskCover(color) {
      this.task.style = { bgColor: color };
      this.updateTask();
    },
  },
  computed: {
    getTaskLabels() {
      return this.task.labelIds;
    },
  },
  components: {
    labelPicker,
    memberPicker,
    datePicker,
    coverPicker,
    miniUsers,
    labelsPreview,
  },
};
</script>

<style lang="scss">
  
</style>
