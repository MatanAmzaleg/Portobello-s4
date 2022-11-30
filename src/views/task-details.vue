<template>
  <section class="task-details">
    <h1>{{task.task}}</h1>
    <h1>{{task._id}}</h1>
    <h1>{{task.description}}</h1>
    <h1>hello</h1>
  </section>
</template>

<script>
import { boardService } from "../services/board.service";

export default {
  async created() {
    const { boardId,groupId, taskId } = this.$route.params;
    if (!boardId || !groupId || !taskId) return;
    this.task = await boardService.getTask(boardId, groupId,taskId);
  },
  data() {
    return {
      task: {},
    };
  },
};
</script>
