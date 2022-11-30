<template>
  <section class="task-details">
    <div class="task-info">
      <div class="info-header">
      <font-awesome-icon icon="fa-solid fa-bars-progress" />
      <h1>{{ task.title }}</h1>
      </div>
      <small>in list TODO</small>
      <h1>Members</h1>
    </div>
    <div class="task-description">
    <div class="description-header">
      <font-awesome-icon icon="fa-solid fa-list" />
      <h1>Description</h1>
    </div>
    <pre>{{ task.description }}</pre>
    </div>
    <div class="task-activity">
      <font-awesome-icon icon="fa-solid fa-list" />
      <h1>Activity</h1>
    </div>
    <div class="add-comment">
      <font-awesome-icon icon="fa-solid fa-user" />
      <input type="text" />
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board.service";

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
    };
  },
};
</script>

<style lang="scss">
.task-details {
  display: flex;
  gap: 25px;
  grid-template-areas: 'task' 'options';
  gap: 40px;
  padding: 30px;
  width: 760px;
  min-height: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: lightblue;
  .info-header,
  .description-header,
  .task-activity {
    grid-area: task;
    margin-bottom: 10px;
    gap: 16px;
    display: flex;
  }
  // .task-description{
  //   display: flex ;
  // }
}
</style>
