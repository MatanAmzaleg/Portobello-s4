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
      <section class="flex">
        <awesomeChart
          class="awesome"
          :tasksStatus="tasksStatus"
          :userEffectiveness="userEffectiveness"
          :data="infoUsers"
        ></awesomeChart>
        <div class="board-stats flex">
          <h1>Board stats:</h1>
          <div class="state flex">
            <h2><font-awesome-icon icon="fa-solid fa-user" />  Board members: {{ numOfMembers }}</h2>
          </div>
          <div class="state flex">
            <h2><font-awesome-icon icon="fa-solid fa-list-check" /> Total lists: {{ numOfMembers }}</h2>
          </div>
          <div class="state flex">
            <h2><font-awesome-icon icon="fa-solid fa-bars-progress" /> Total tasks: {{ numOfTasks }}</h2>
          </div>
        </div>
      </section>
      <button @click="goBackToBoard"><font-awesome-icon class="close-add-task-btn" icon="fa-solid fa-xmark" /></button>
    </section>
  </Transition>
</template>

<script>
import awesomeChart from "../cmps/awesome-chart.vue";
export default {
  name: "dashboard-route",
  created() {
    this.currBoard = this.$store.getters.currBoard;
    console.log(this.currBoard);
    console.log(this.userEffectiveness);
    console.log(this.tasksStatus);
    this.infoUsers;
  },
  data() {
    return {
      currBoard: null,
    };
  },
  methods: {
   goBackToBoard(){
      this.$router.push(`/board/${this.currBoard._id}`)
   }
  },
  computed: {
    infoUsers() {
      if (!this.$store.getters.currBoard) return;
      const usersInfoMap = {Unassigned:{tasks:[]}};

      this.currBoard.members.map((m) => {
        return this.currBoard.groups.map((g) =>
          g.tasks.map((t) => {
            if (!t.memberIds.length) {
                    usersInfoMap.Unassigned.tasks.push(t);
            } else {
              return t.memberIds.map((mId) => {
                if (mId === m._id) {
                  if (!usersInfoMap[m.fullname]) {
                    usersInfoMap[m.fullname] = {}
                    usersInfoMap[m.fullname].tasks = []
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
    tasksStatus(){
      if (!this.$store.getters.currBoard) return;
      const taskStatus = {"without-date":0, completed:0, overdue:0, "due-soon":0, "long-range-tasks":0}
      this.currBoard.groups.forEach(group=> group.tasks.forEach(task =>  {
         if(task.status=== 'completed') taskStatus.completed ++
         else if (task.dueDate - Date.now() >= 86349893 ) taskStatus["long-range-tasks"] ++
         else if (task.dueDate - Date.now() < 86349893 && task.dueDate - Date.now() > 0) taskStatus["due-soon"] ++
         else if(task.dueDate - Date.now() < 86349893 && task.dueDate - Date.now() < 0) taskStatus.overdue ++
         else taskStatus["without-date"] ++
      }))
      console.log(taskStatus);
      return taskStatus
    },
    userEffectiveness(){
      if (!this.$store.getters.currBoard) return;

      const userEffectiveness = {};
      this.currBoard.members.map((m) => {
        return this.currBoard.groups.map((g) =>
          g.tasks.map((t) => {
            if (!t.memberIds.length) return false;
             else {
              return t.memberIds.map((mId) => {
                if (mId === m._id) {
                  if (!userEffectiveness[m.fullname]) userEffectiveness[m.fullname] = {completed:0, uncompleted:0}
                  if(t.status === "completed") {
                     userEffectiveness[m.fullname].completed ++
                  }else userEffectiveness[m.fullname].uncompleted ++
                }
              });
            }
          })
        );
      });
      return userEffectiveness
    } ,
    numOfMembers(){
      return this.currBoard?.members.length
    },
    numOfLists(){
      return this.currBoard?.groups.length
    },
    numOfTasks(){
      let counter = 0
       this.currBoard?.groups.forEach(g=> g.tasks.forEach(task=> counter++))
       return counter
    },

    currBoard() {
      this.$store.getters.currBoard;
    },
  },
  components: {
    awesomeChart,
  },
};
</script>
