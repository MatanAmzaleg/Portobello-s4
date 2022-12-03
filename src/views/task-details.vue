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
        <font-awesome-icon class="title-icon" icon="fa-solid fa-bars-progress" />
        <div class="task-title-wrapper">
          <input v-model="task.title" @input="updateTask" type="text" />
          <h5>in group {{ this.groupId }}</h5>
        </div>
      </div>
      <section class="task-content">
        <section class="content">
          <div class="task-section task-info">
            <span></span>
            <div class="task-info-wrapper">
              <miniUsers v-if="task.memberIds" :memberIds="task.memberIds" />
              <labelsPreview v-if="task.labelIds" :currBoard="currBoard" :labelIds="task.labelIds" />
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

      <span @click="exitTask" class="task-exit-btn">X</span>
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
  props:{
    currBoard:Object
  },
  async created() {
    let {taskId} = this.$route.params
    let  task = await this.$store.dispatch({type:"loadTask",board:this.currBoard,taskId}) 
    this.task = JSON.parse(JSON.stringify(task))
  },
  data() {
    return {
      groupId: "",
      task: {},
      isDetailsShown: false,
    };
  },
  methods: {
    exitTask(){
      this.$router.push(`/board/${this.currBoard._id}`)
    },  
    toggleDetails() {
      this.isDetailsShown = !this.isDetailsShown;
    },
    async updateTask(){
      try{
        let board = JSON.parse(JSON.stringify(this.currBoard))
        let taskIdx 
        let groupIdx = board.groups.findIndex(group => group.tasks.some((task,idx)=> {
          if(task.id === this.task.id) taskIdx = idx
          return task.id === this.task.id
        }))
        board.groups[groupIdx].tasks[taskIdx] = this.task
        await this.$store.dispatch({type:'addBoard',board})
      }
      catch(err){
        console.log('cant Update task',err);
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
      this.updateTask()
    },
    saveTaskCover(color) {
      this.task.style = {bgColor: color}
      this.updateTask()
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
    labelsPreview
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
