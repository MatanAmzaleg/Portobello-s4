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
              <h3>Description</h3>
              <p
            @click="isEdit = true"
            @blur.stop="onEdit"
            contenteditable="true"
            spellcheck="false"
            class="description-info"
          >
            {{ task.description }}
          </p>
              <!-- <textarea @change="saveTask" v-model="task.description"></textarea> -->
            </div>
          </div>
          <div class="task-section task-todo"></div>
          <div class="task-section task-activity">
            <span class="activity-icon"></span>
            <div class="task-activity-wrapper">
              <h3>Activity</h3>
              <button>HELLO</button>
            </div>
            <div class="task-section">
              <font-awesome-icon icon="fa-regular fa-user" />
              <input type="text" />
            </div>
          </div>
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
      isDetailsShown: false,
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
        await this.$store.dispatch({ type: "addBoard", board });
      } catch (err) {
        console.log("cant Update task", err);
      }
    },
    closeModal() {
      this.$router.push("/board");
    },
    addLabel(labels) {
      this.task.labels = labels;
    },
    addMember(members) {
      this.task.members = members;
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
   .description-info {
        margin-bottom: 10px;
        margin-top: 5px;
        max-width: 92%;
        padding: 5px 10px;
        color: #172b4d;
        border-radius: 4px;
        font-size: 14px;
        background-color: #091e420a;
        font-family: NunitoSans-regular;
        overflow-wrap: break-word;
        min-height: 50px;
        &:focus {
          background-color: #fff;
          box-shadow: inset 0 0 0 2px #0079bf;
        }
        &:empty:before {
          content: 'Add a more detailed description...';
        }}

.task-section {
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr;
  svg {
    margin-block-start: 6px;
    justify-self: center;
  }
}
.task-edit-screen {
  height: 100%;
  width: 100%;
  position: absolute;
  align-items: flex-start;
  background-color: #0009;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  .task-edit-container {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 44px;
    min-height: 700px;
    width: 768px;
    background-color: #f4f5f7;
    border-radius: 5px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.315);
    .header-icon,.description-icon,.activity-icon {
        font-family: trellicons;
        place-self: center;
        align-self: flex-start;
        font-size: 24px;
      }
      .header-icon{
        &::before {
          content: '\e912';
        }
      }
      .description-icon {
          &::before {
            content: '\e922';
          }
        }
       .activity-icon {
            &::before {
              content: '\e900';
            }
          }
    .task-cover {
      height: 117px;
    }

    .task-title {
      margin-top: 30px;
      width: 100%;
      input {
        outline: none;
        border: none;
        background-color: transparent;
        width: 95%;
        height: 30px;
        font-size: 20px;
        border-radius: 3px;
        color: #172b4d;
        &:focus {
          background-color: #fff;
          outline: 1px solid blue;
        }
      }
    }

    .task-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      .content {
        width: 70%;

        .task-section {
          .task-info-wrapper{
            display: flex;
          }
          &.task-info {
            grid-column: 2;
          }
        }
      }

      .actions {
        width: 30%;
      }
    }
    .task-exit-btn {
      border-radius: 50%;
    color: var(--ds-icon,#42526e);
    height: 32px;
    margin: 4px;
    overflow: hidden;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color 85ms,color 85ms;
    width: 32px;
    z-index: 2;
    display: grid;
    place-content: center;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
