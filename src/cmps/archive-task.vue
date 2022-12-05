<template lang="">
    <div  v-if="!this.task.archivedAt" @click="archiveTask" class="task-option-btn">
        <span class="archive-icon icon-actions"></span>
        <p>Archive</p>
    </div>
    <div v-else class="archive-controller">
        <div @click="restoreTask" class="task-option-btn">
            <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />
            <p>Send to Board</p>
        </div>
        <div @click="deleteTask" class="task-option-btn delete">
            <font-awesome-icon icon="fa-solid fa-minus" />
            <p>Delete</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        task: Object
    },
    methods: {
        archiveTask() {
            this.$emit('archive-task')
        },
        restoreTask() {
            this.$emit('restore-task')
        },
        deleteTask() {
            this.$emit('delete-task')
        }
    }

}
</script>
<style lang="scss">
.task-option-btn {
    &.delete {
        background-color: #b04632;
        color: white;

        p {
            color: white;
        }

        &:hover {
            background-color: #933b27;
        }
    }
}
</style>