<template>
  <section class="option-charts">
    <div class="chart">
      <h1 title="chart-title">Tasks per user</h1>
      <DoughnutChart :chartData="TasksPerUsers" />
    </div>
    <div class="chart">
      <h1 title="chart-title">Most effective user</h1>
      <BarChart class="bar-chart" :chartData="mostEffective" />
    </div>
    <div class="chart">
      <h1 title="chart-title">Most uneffective user</h1>
      <BarChart class="bar-chart" :chartData="mostUneffective" />
    </div>
    <div class="chart">
      <h1 title="chart-title">All tasks status</h1>
      <DoughnutChart :chartData="getTasksStatus" />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { DoughnutChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import TaskList from "./task-list.vue";

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  props: {
    data: Object,
    userEffectiveness: Object,
    tasksStatus: Object,
  },
  created() {
    console.log(this.TasksPerUsers);
    console.log(this.userEffectiveness);
  },
  computed: {
    TasksPerUsers() {
      console.log(this.data);
      const TasksPerUsersToSend = { labels: [], datasets: [{ data: [] }] };
      for (const m in this.data) {
        TasksPerUsersToSend.labels.push(m);
      }
      const tasks = [];
      for (const m in this.data) {
        tasks.push(this.data[m].tasks.map((task) => task.title));
        TasksPerUsersToSend.datasets[0].data.push(m);
      }
      const data = tasks.map((tasks) => {
        return tasks.length;
      });
      TasksPerUsersToSend.datasets[0].data = data;
      TasksPerUsersToSend.datasets[0].backgroundColor = [
        "#FF6464",
        "#0079AF",
        "#123E6B",
        "#97B0C4",
        "#A5C8ED",
      ];
      return TasksPerUsersToSend;
    },
    mostEffective() {
      const userEffectiveness = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#FF6464",
              "#FFE9A0",
              "#0F3460",
            ],
          },
        ],
      };
      for (const userE in this.userEffectiveness) {
        console.log(this.userEffectiveness[userE]);
        userEffectiveness.labels.push(userE);
        userEffectiveness.datasets[0].data.push(
          this.userEffectiveness[userE].completed
        );
        console.log(userEffectiveness.labels);
      }
      console.log(userEffectiveness);
      return userEffectiveness;
    },
    mostUneffective() {
      const userEffectiveness = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      };
      for (const userE in this.userEffectiveness) {
        console.log(this.userEffectiveness[userE]);
        userEffectiveness.labels.push(userE);
        userEffectiveness.datasets[0].data.push(
          this.userEffectiveness[userE].uncompleted
        );
        console.log(userEffectiveness.labels);
      }
      console.log(userEffectiveness);
      return userEffectiveness;
    },
    getTasksStatus() {
      console.log(this.tasksStatus);
      const tasksStatuses = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#D8D9CF",
              "#B3FFAE",
              "#FF6464",
              "#FFE9A0",
              "#0F3460",
            ],
          },
        ],
      };
      for (const status in this.tasksStatus) {
        tasksStatuses.labels.push(status);
        tasksStatuses.datasets[0].data.push(this.tasksStatus[status]);
        console.log(tasksStatuses);
      }
      return tasksStatuses;
    },
  },
  components: { DoughnutChart, BarChart },
});
</script>

<style></style>
