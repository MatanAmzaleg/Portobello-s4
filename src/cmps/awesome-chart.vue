<template>
  <section class="option-charts">
    <div class="chart">
      <h1 title="chart-title">Tasks per user</h1>
      <BarChart :chartData="TasksPerUsers" :options="options" />
    </div>
    <div class="chart">
      <h1 title="chart-title">All tasks status</h1>
      <BarChart :chartData="getTasksStatus" :options="options" />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { DoughnutChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  props: {
    data: Object,
    userEffectiveness: Object,
    tasksStatus: Object,
  },
  data(){
    return{
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  },
<<<<<<< HEAD
  created() {
  },
=======
>>>>>>> 15b948831630649736c3f7ce6b341079be5d4f8d
  computed: {
    TasksPerUsers() {
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
        "#FAF8F1",
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
        userEffectiveness.labels.push(userE);
        userEffectiveness.datasets[0].data.push(
          this.userEffectiveness[userE].completed
        );
      }
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
        userEffectiveness.labels.push(userE);
        userEffectiveness.datasets[0].data.push(
          this.userEffectiveness[userE].uncompleted
        );
      }
      return userEffectiveness;
    },
    getTasksStatus() {
      const tasksStatuses = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#F5EBE0",
              "#678983",
              "#B73E3E",
              "#F7D716",
              "#0F3460",
            ],
          },
        ],
      };
      for (const status in this.tasksStatus) {
        tasksStatuses.labels.push(status);
        tasksStatuses.datasets[0].data.push(this.tasksStatus[status]);
      }
      return tasksStatuses;
    },
  },
  components: { DoughnutChart, BarChart },
});
</script>