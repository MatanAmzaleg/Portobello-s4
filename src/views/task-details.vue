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
            <div class="task-info-wrapper" v-if="(task.memberIds?.length || task.labelIds?.length)">
              <miniUsers v-if="task.memberIds?.length" :memberIds="getTaskMembers" />
              <labelsPreview
              v-if="task.labelIds?.length"
                :currBoard="currBoard"
                :labelIds="getTaskLabels"
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
            <checkList />
            <datePicker />
            <coverPicker @setCover="saveTaskCover" />
          </div>
        </section>
      </section>

      <span @click="exitTask" class="task-exit-btn"> <svg class="margin" width="18" height="18" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="grey"></path>
                </svg></span>
    </div>
  </div>
</template>

<script>
import labelPicker from "../cmps/label-picker.vue";
import memberPicker from "../cmps/member-picker.vue";
import checkList from "../cmps/check-list.vue";
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
        // console.log(board);
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
    saveTaskMembers(members) {
      this.task.memberIds = members
      this.updateTask();
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
    checkList,
    datePicker,
    coverPicker,
    miniUsers,
    labelsPreview,
  },
};
</script>

<style lang="scss">
  
</style>
