<template>
    <div @click.stop="toggleTask()" class="task-preview-date task-status" :class="statusComputed">
        <span class="clock-icon"></span>
        <a>{{ dateComputed }}</a>
    </div>
</template>
<script>
import dateFormat, { masks } from "dateformat";
import { eventBus } from "../services/event-bus.service";
export default {
    props: {
        date: Number,
        status: String,
        taskId: String
    },
    methods: {
        toggleTask() {
            eventBus.emit('toggleTask', { taskId: this.taskId, status: this.status })
        }
    },
    computed: {
        statusComputed() {
            console.log(this.date);
            if (this.status === 'completed') return 'completed'
            if (this.date - Date.now() >= 86349893) return 'regular'
            if (this.date - Date.now() < 86349893 && this.date - Date.now() > 0) return 'due-soon'
            return 'overdue'
        },
        dateComputed() {
            return dateFormat(new Date(this.date), "d mmm");
        }
    }
}
</script>
<style lang="scss">
.task-status.completed:hover {
    .clock-icon:before {
        content: "\e918";
    }
}

.vc-container {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}


.task-preview-date {
    margin: 0;
    max-width: 64px;
    min-height: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    padding: 2px 5px;
    border-radius: 3px;
    &:hover {
        filter: contrast(80%);

        .clock-icon:before {
            content: "\e919";
        }

    }

    a {
        font-size: 12px !important;
    }

    .clock-icon:before {
        content: "\e91b";
    }
}
</style>