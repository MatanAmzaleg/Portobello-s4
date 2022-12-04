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
          <p>in list {{ this.groupId }}</p>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div class="task-info-wrapper">
              <miniUsers v-if="task.memberIds" :memberIds="getTaskMembers" />
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
              <h3 class="task-mini-title">Description</h3>
              <!-- <el-button v-if="!isEdit" @click="isEdit = true" class="task-btn">Edit</el-button> -->
            </div>
              <p
            v-if="!isEdit"
            contenteditable="true"
            spellcheck="false"
            @click="isEdit = true"
            class="description-info"
          >
            {{ task.description }}
          </p>
          <div v-else class="details-edit">
          <textarea @input="updateTask" v-model="task.description" class="description-input" placeholder="Add a more detailed description..."></textarea>
          <el-button @click="(isEdit = false)" type="primary">Save</el-button>
          <el-button @click="(isEdit = false)">Cancel</el-button>
          </div>
          </div>
          </div>
          <div v-if="false" class="task-section task-todo"></div>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3 class="task-mini-title">Activity</h3>
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
            <h3 class="mini-title">Add to card</h3>
            <memberPicker @addMember="saveTaskMembers" :members="getTaskMembers" />
            <labelPicker @saveLabel="saveTaskLabels" :labelIds="getTaskLabels" />
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
      isEdit:false
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
    saveTaskMembers(id) {
      // if(!this.task.memberIds) this.task.memberIds = []
      // let memberIdx = this.task.memberIds.findIndex(m => m._id === id);
      // if(memberIdx === -1){
        this.task.memberIds.push(id)
      this.updateTask();
      // return
      // }
      // this.task.memberIds.splice(memberIdx,1)
      // this.updateTask();
    },
  },
  computed: {
    getTaskLabels() {
      return this.task.labelIds;
    },
    getTaskMembers() {
      return this.task.memberIds;
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
