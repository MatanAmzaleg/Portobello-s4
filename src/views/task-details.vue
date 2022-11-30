<template>
  <div class="task">
    <section class="task-details">
      <div class="task-info">
        <div class="info-header">
          <font-awesome-icon icon="fa-solid fa-bars-progress" />
          <h1>{{ task.title }}</h1>
        </div>
        <small>in list "task from group "</small>
      </div>
      <div class="task-description">
        <div class="description-header">
          <font-awesome-icon icon="fa-solid fa-list" />
          <h1>Description</h1>
        </div>
        <pre>{{ task.description }}</pre>
      </div>
      <div class="task-activity">
        <div>
          <font-awesome-icon icon="fa-solid fa-list" />
          <h1>Activity</h1>
        </div>
        <button @click="toggleDetails">{{isDetailsShown ? 'Hide Details': 'Show Details'}}</button>
      </div>
      <div class="add-comment">
        <font-awesome-icon icon="fa-solid fa-user" />
        <input type="text" />
      </div>
      <div v-if="isDetailsShown" class="task-comments">
      <h1>DETAILSSSS</h1>
      </div>
    </section>
    <section class="task-options">
      <font-awesome-icon @click="closeModal" class="exit-btn" icon="fa-solid fa-xmark" />
      <labelPicker :labels="this.task.labelsId" />
    </section>
  </div>
</template>

<script>
import { boardService } from "../services/board.service";
import labelPicker from "../cmps/label-picker.vue"
export default {
  async created() {
    let boardId = "b101";
    let groupId = "g102";
    let taskId = "c104";
    this.task = await boardService.getTask(boardId, groupId, taskId);
  },
  data() {
    return {
      task: {},
      isDetailsShown: false
    };
  },
  methods:{
    toggleDetails(){
      this.isDetailsShown = !this.isDetailsShown
    },
    closeModal(){
      this.$router.push('/board')
    },
    addLabel(labels){
      this.task.labels = labels
    },
    addMember(members){
      this.task.members = members
    }
  },
  components:{
    labelPicker
  }
};
</script>

<style lang="scss">
.task {
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  grid-template-areas: "task options";
  width: 760px;
  min-height: 600px;
  margin-left: auto;
  margin-right: auto;
}
.task-details {
  padding: 20px;
  grid-area: "task";
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: rgb(220, 216, 216);
  .info-header,
  .description-header,
  .task-activity {
    grid-area: task;
    margin-bottom: 10px;
    gap: 16px;
    display: flex;
  }
  .task-activity {
    div{
      gap: 16px;
      display: flex;
    }
    justify-content: space-between;
    margin-bottom: 0px;
  }
  .add-comment{
    display: flex;
    gap: 16px;
    input{
      width: 100%;
    }
  }
}
.task-options {
  padding: 20px;
  position: relative;
  background-color: red;
  .exit-btn {
    position: absolute;
    right: 20px;
  }
}
</style>
