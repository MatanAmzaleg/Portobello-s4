<template>
  <div class="task-edit-screen">
    <div class="task-edit-container">
      <div
        v-if="task.style?.bgColor"
        class="task-cover"
        :style="{ 'background-color': task.style.bgColor }"
      >
        <span></span>
      </div>
      <div class="task-section task-title">
        <font-awesome-icon class="title-icon" icon="fa-solid fa-bars-progress" />
        <div class="task-title-wrapper">
          <input @change="saveTask" v-model="task.title" type="text" />
          <h5>in group {{ this.groupId }}</h5>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div class="task-info-wrapper">
              <small>members</small>
              <small>labels</small>
              <h2>Due date</h2>
            </div>
          </div>
          <div class="task-section task-description">
            <font-awesome-icon icon="fa-solid fa-bars-staggered" />
            <div class="task-description-wrapper">
              <h3>Description</h3>
              <textarea @change="saveTask" v-model="task.description"></textarea>
            </div>
          </div>
          <div class="task-section task-todo"></div>
          <div class="task-section task-activity">
            <font-awesome-icon icon="fa-solid fa-bars-staggered" />
            <div class="task-activity-wrapper">
              <h3>Activity</h3>
            </div>
            <div class="task-section ">
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

      <span class="task-exit-btn">X</span>
    </div>
  </div>
</template>

<script>
import { boardService } from "../services/board.service";
import labelPicker from "../cmps/label-picker.vue";
import memberPicker from "../cmps/member-picker.vue";
import datePicker from "../cmps/date-picker.vue";
import coverPicker from "../cmps/cover.picker.vue";
export default {
  async created() {
    let boardId = "b101";
    let groupId = "g102";
    this.groupId = groupId;
    this.boardId = boardId;
    let taskId = "c104";
    this.task = await boardService.getTask(boardId, groupId, taskId);
    console.log(this.task.labelIds);
  },
  data() {
    return {
      groupId: "",
      task: {},
      isDetailsShown: false,
    };
  },
  methods: {
    toggleDetails() {
      this.isDetailsShown = !this.isDetailsShown;
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
    saveTask() {
      boardService
        .saveTask(this.boardId, this.groupId, this.task)
        .then((x) => console.log("saved"));
    },
    saveTaskLabels(labels) {
      this.task.labelIds = labels;
      boardService
        .saveTask(this.boardId, this.groupId, this.task)
        .then((x) => console.log("saved"));
    },
    saveTaskCover(color) {
      console.log("here", color);
      this.task.style.bgColor = color;
      boardService
        .saveTask(this.boardId, this.groupId, this.task)
        .then((x) => console.log("saved"));
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
  },
};
</script>

<style lang="scss">
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

    .task-cover {
      height: 100px;
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
      position: absolute;
      top: 0;
      background-color: rgba(255, 255, 255, 0.2);
      top: 5px;
      right: 4px;
      height: 30px;
      border-radius: 50%;
      transition: background-color 0.1s, color 0.1s;
      padding: 8px;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        background-color: rgba(249, 249, 249, 0.94);
      }
    }
  }
}

// .task-edit-container{
//   position: relative;
//   top: 44px;
//   min-height: 700px;
//   width: 768px;
//   background-color: #f4f5f7;
//   border-radius: 5px;
//   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.315);
//   display: flex;
//   display: grid;
//   grid-template-columns: 1fr 208px;
//   grid-template-rows: 90px  0.2fr 0.2fr 0.3fr 0.2fr 0.3fr;
//   grid-template-areas: 'cover cover' 'title title' 'info actions' 'desc actions' 'todo actions' 'activity actions';
//   > *{
//     padding: 20px;
//   }
//   .task-cover{
//     max-width: 100%;
//     grid-area: cover;
//   }
//   .task-title{
//     grid-area: title;
//     display: grid;
//     grid-template-columns: 50px 1fr;
//     grid-template-areas: 'icon info';
//     .task-title-wrapper{
//       grid-area: info;
//       input{
//         outline: none;
//         border: none;
//         background-color: transparent;
//         width: 95%;
//         height: 30px;
//         font-size: 20px;
//         border-radius: 3px;
//         color: #172b4d;
//         &:focus {
//           background-color: #fff;
//           outline:1px solid blue
//         }
//     }
//   }
// }
// .task-info{
//   max-width: 100%;
//   grid-area: info;
//   display: grid;
//   grid-template-columns: 50px 1fr;
//   grid-template-areas: 'icon info';
//     .task-info-wrapper{
//       grid-area: info;
//     }
//   }
//   .task-description{
//     max-width: 100%;
//     grid-area: desc;
//     display: grid;
//   grid-template-columns: 50px 1fr;
//   grid-template-areas: 'icon info';
//     .task-description-wrapper{
//         grid-area: info;
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//       }
//       textarea{
//         width: 90%;
//       }
//   }
//   .task-todo{
//     max-width: 100%;
//     grid-area: todo;
//   }
//   .task-activity{
//     max-width: 100%;
//     grid-area: activity;
//     display: grid;
//   grid-template-columns: 50px 1fr;
//   grid-template-areas: 'icon info';
//     .task-activity-wrapper{
//       grid-area: info;
//     }
//   }
//   .task-actions{
//     grid-area: actions;
//   }
//   .task-exit-btn {
//     position: absolute;
//     top: 0;
//     background-color: rgba(255, 255, 255, 0.2);
//     top: 5px;
//     right: 4px;
//     height: 30px;
//     border-radius: 50%;
//     transition: background-color 0.1s, color 0.1s;
//     padding: 8px;
//     font-size: 20px;
//     cursor: pointer;
//     &:hover{
//       background-color: rgba(249, 249, 249, 0.94);
//     }
//   }
// }
</style>
