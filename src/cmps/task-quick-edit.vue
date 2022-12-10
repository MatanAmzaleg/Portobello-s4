<template>
  <section class="task-list">
    <div class="cover" v-if="Object.keys(item.style).length !== 0 && item.style?.mode !== 'full'" :style="
      item.style?.bgColor
        ? { 'background-color': item.style.bgColor }
        : {
          'background-image': 'url( ' + item.style.imgUrl + ')',
          height: '80px',
          'background-position': 'center',
          'background-size': 'cover',
        }
    "></div>
    <div class="cover" v-if="item.style?.mode === 'full'" :style="
      item.style?.bgColor
        ? { 'background-color': item.style.bgColor, height: '56px' }
        : {
          'background-image': 'url( ' + item.style.imgUrl + ')',
          height: '256px',
          'background-position': 'center',
          'background-size': 'cover',
        }
    ">
    </div>
    <section class="task-preview">
      <div v-if="item.style?.mode !== 'full'" class="padded-section">
        <div class="labels" v-if="item.labelIds?.length > 0">
          <span @click.stop="openLabelExtended" class="label" :class="labelExtendedClass" v-for="label in item.labelIds"
            :style="{ 'background-color': labelColor(label) }">
            <div class="circle" :style="{ 'background-color': labelColor(label) }"></div>
            <span class="label-title" v-if="isLabelsExtended">{{
                getLabelTitle(label)
            }}</span>
          </span>
        </div>
        <!-- <span class="task-router-link">{{ item.title }}</span> -->
        <textarea class="textarea">{{ item.title }}</textarea>
        <div v-if="taskExtra(item)" class="task-preview-info">
          <div class="task-preview-content">
            <span v-if="item.isWatched" class="watch-icon"></span>
            <TaskDatePreview v-if="item.dueDate" :status="item.status" :date="item.dueDate" :taskId="item.id" />
            <span v-if="item.description?.length" class="description-icon"></span>
            <div v-if="item.comments.length > 0" class="task-preview-checklist">
              <span class="comments-icon">
              </span>
              <span class="comments-span">{{ item.comments.length }}</span>
            </div>
            <span v-if="item.attachments" class="attachment-icon">{{
                item.attachments.length
            }}</span>
            <div class="task-preview-checklist" :class="isDone ? 'done' : ''">
              <span v-if="item.checklists?.length" class="checklist-icon">
                <span>{{ getTodoStatus(item.checklists) }}</span>
              </span>
            </div>
          </div>
          <mini-users-designed :memberIds="item.memberIds"></mini-users-designed>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import popperAddMember from "./popper-add-member.vue";
import popperCalendar from "./popper-calendar.vue";
import popperLabel from "./popper-label.vue";
import miniUsersDesigned from "./mini-users-designed.vue";
import miniUsers from "./mini-users.vue";
import TaskDatePreview from "./task-date-preview.vue";
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      taskTitle: ''
    };
  },
  created() {
    this.taskTitle = this.item?.title
    console.log('1', this.item)
  },
  methods: {
    labelColor(id) {
      const label = this.$store.getters.currBoard.labels.find((l) => {
        return l.id === id;
      });
      if (!label) return;
      return label.color;
    },
    labelText(id) {
      const label = this.$store.getters.currBoard.labels.find(
        (l) => l.id === id
      );
      if (!label) return;
      return label.title;
    },
    taskExtra(item) {
      return (
        item.description?.length ||
        item.attachments?.length ||
        item.checklists?.length ||
        item.memberIds?.length ||
        item.dueDate ||
        item.isWatched
      );
    },
    getTodoStatus(checklists) {
      if (!checklists.length) return;
      let doneTasks = 0;
      checklists.forEach((checklist) => {
        doneTasks += checklist.todos.filter((todo) => todo.isDone).length;
      });
      let allTasks = 0;
      checklists.forEach((checklist) => (allTasks += checklist.todos.length));
      this.isDone = allTasks === doneTasks ? true : false;
      return `${doneTasks}/${allTasks}`;
    },
    openLabelExtended() {
      this.isLabelsExtended = !this.isLabelsExtended;
      this.labelExtendedClass;
    },
    getLabelTitle(labelId) {
      const boardLabels = this.currBoard.labels;
      const label = boardLabels.find((l) => l.id === labelId);
      console.log(label);
      return label.title;
    },
    updateQuickEdit() {
      this.$emit('updateQuickEdit', item.id)
    }
  },
  components: {
    popperAddMember,
    popperCalendar,
    popperLabel,
    miniUsersDesigned,
    miniUsers,
    TaskDatePreview
  },
};
</script>
<style lang="scss">
.task-quick-edit-input {
  height: 100px;

}
</style>
