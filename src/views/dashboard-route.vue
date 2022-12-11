<template>
  <Transition>
    <section class="dashboard-section">
      <header>
        <h1>Board dashboard</h1>
        <font-awesome-icon
          class="dashboard-icon"
          icon="fa-solid fa-chart-line"
        />
      </header>
      <section class="main-conatiner flex">
        <div class="user-and-board-container flex column">
          <div class="user-details">
            <div class="img-div">
              <img :src="loggedInUser.imgUrl" alt="">
            </div>
            <div class="content flex column">
              <h3>{{loggedInUser.fullname}}</h3>
              <h4>{{loggedInUser.username}}</h4>
            </div>
          </div>
          <div class="user-stats">
            <h1>Tasks assigned to me:</h1>
            <div class="progress flex">
              <h3>Total tasks: <span>{{getTotalTasks}}</span></h3>
            </div>
            <div class="progress flex">
              <h3>Unfinished tasks:</h3>
              <div class="progress-container">
                <el-progress
                  :percentage="getUnfinishedTask"
                  :color="getUnfinishedTask === 100 ? '#CC3636' : '#5ba4cf'"
                  :width="200"
                >
                </el-progress>
              </div>
            </div>
            <div class="progress flex">
              <h3>Finished tasks:</h3>
              <div class="progress-container">
                <el-progress
                  :percentage="getFinishedTask"
                  :color="getUnfinishedTask === 0 ? '#CC3636' : getUnfinishedTask === 100 ? '#61bd4f' : '#5ba4cf'"
                  :width="200"
                >
                </el-progress>
              </div>
            </div>
          </div>
          <div class="board-stats flex">
            <h1>Board stats:</h1>
            <div class="states-container flex">
              <div class="state flex column">
                <font-awesome-icon class="icon" icon="fa-solid fa-user" />
                <h2>{{ numOfMembers.length }}</h2>
                <h3>Board members</h3>
              </div>
              <div class="state flex column">
                <font-awesome-icon class="icon" icon="fa-solid fa-list-check" />
                <h2>
                  {{ numOfLists }}
                </h2>
                <h3>Total lists</h3>
              </div>
              <div class="state flex column">
                <font-awesome-icon
                  class="icon"
                  icon="fa-solid fa-bars-progress"
                />
                <h2>{{ numOfTasks }}</h2>
                <h3>Total tasks</h3>
              </div>
            </div>
          </div>
        </div>
        <awesomeChart
          class="awesome"
          :tasksStatus="tasksStatus"
          :userEffectiveness="userEffectiveness"
          :data="infoUsers"
        ></awesomeChart>
      </section>
      <section class="flex column"></section>
      <button @click="goBackToBoard">
        <font-awesome-icon
          class="close-add-task-btn"
          icon="fa-solid fa-xmark"
        />
      </button>
    </section>
  </Transition>
</template>

<script>
import awesomeChart from "../cmps/awesome-chart.vue";
export default {
  name: "dashboard-route",
  created() {
    console.log(this.userUnfinishedP);
    this.currBoard = this.$store.getters.currBoard;
    this.userEffectiveness = this.setUserEffectiveness;
    this.infoUsers;
    this.setUserEffectiveness();
    console.log(this.loggedInUser);
  },
  data() {
    return {
      currBoard: null,
      userEffectiveness: {},
      loggedInUserStates: null,
    };
  },
  methods: {
    goBackToBoard() {
      this.$router.push(`/board/${this.currBoard._id}`);
    },
    setUserEffectiveness() {
      if (!this.$store.getters.currBoard) return;

      const userEffectiveness = {};
      this.currBoard.members.map((m) => {
        return this.currBoard.groups.map((g) =>
          g.tasks.map((t) => {
            if (!t.memberIds.length) return false;
            else {
              return t.memberIds.map((mId) => {
                if (mId === m._id) {
                  if (!userEffectiveness[m._id])
                    userEffectiveness[m._id] = {
                      completed: 0,
                      uncompleted: 0,
                    };
                  if (t.status === "completed") {
                    userEffectiveness[m._id].completed++;
                  } else userEffectiveness[m._id].uncompleted++;
                }
              });
            }
          })
        );
      });

      const loggedInUserP = this.loggedInUser._id;
      this.loggedInUserStates = userEffectiveness[loggedInUserP];
      console.log(this.loggedInUserStates);
    },
  },
  computed: {
    infoUsers() {
      if (!this.$store.getters.currBoard) return;
      const usersInfoMap = { Unassigned: { tasks: [] } };

      this.currBoard.members.map((m) => {
        return this.currBoard.groups.map((g) =>
          g.tasks.map((t) => {
            if (!t.memberIds.length) {
              for (var i = 0; i < usersInfoMap.Unassigned.length; i++) {
                console.log(usersInfoMap.Unassigned[i]);
                if (usersInfoMap.Unassigned[i] === t) {
                  console.log("there");
                }
              }
              usersInfoMap.Unassigned.tasks.push(t);
            } else {
              return t.memberIds.map((mId) => {
                if (mId === m._id) {
                  if (!usersInfoMap[m.fullname]) {
                    usersInfoMap[m.fullname] = {};
                    usersInfoMap[m.fullname].tasks = [];
                  }
                  usersInfoMap[m.fullname].tasks.push(t);
                }
              });
            }
          })
        );
      });
      return usersInfoMap;
    },
    tasksStatus() {
      if (!this.$store.getters.currBoard) return;
      console.log(this.$store.getters.currBoard);
      const taskStatus = {
        "without-date": 0,
        completed: 0,
        overdue: 0,
        "due-soon": 0,
        "long-range-tasks": 0,
      };
      this.currBoard.groups.forEach((group) =>
        group.tasks.forEach((task) => {
          if (!task.dueDate) taskStatus["without-date"]++;
          if (task.status === "completed") taskStatus.completed++;
          if (task.dueDate - Date.now() >= 86349893)
            taskStatus["long-range-tasks"]++;
          if (
            task.dueDate - Date.now() < 86349893 &&
            task.dueDate - Date.now() > 0
          )
            taskStatus["due-soon"]++;
          if (
            task.dueDate - Date.now() < 86349893 &&
            task.dueDate - Date.now() < 0
          )
            taskStatus.overdue++;
        })
      );
      console.log(taskStatus);
      return taskStatus;
    },

    numOfMembers() {
      return this.currBoard?.members;
    },
    numOfLists() {
      return this.currBoard?.groups.length;
    },
    numOfTasks() {
      let counter = 0;
      this.currBoard?.groups.forEach((g) =>
        g.tasks.forEach((task) => counter++)
      );
      return counter;
    },

    currBoard() {
      this.$store.getters.currBoard;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    getUnfinishedTask() {
      let tasksSum = 0;
      for (const tasks in this.loggedInUserStates) {
        tasksSum += this.loggedInUserStates[tasks]
      }
      return (this.loggedInUserStates.uncompleted / tasksSum) * 100;
    },
    getTotalTasks() {
      let tasksSum = 0;
      for (const tasks in this.loggedInUserStates) {
        tasksSum += this.loggedInUserStates[tasks];
      }
      return tasksSum
  },
  getFinishedTask() {
      let tasksSum = 0;
      for (const tasks in this.loggedInUserStates) {
        tasksSum += this.loggedInUserStates[tasks]
      }
      return (this.loggedInUserStates.completed / tasksSum) * 100;
    },
},
  components: {
    awesomeChart,
  },
};
</script>
