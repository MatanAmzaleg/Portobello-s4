<template>
    <Popper class="popper-btn" offsetSkid="116">
        <font-awesome-icon class="ellipsis-icon" icon="fa-solid fa-ellipsis" />
        <template #content="{ close }">
            <div class="popper-content popper-template delete-popper">
                <popperModal :title="requestedTitle" @closeModal="close" />
                <div class="content content-delete">
                    <el-button @click="deleteRequested"
                        class="task-btn delete-btn-task">Delete</el-button>
                </div>
            </div>
        </template>
    </Popper>
</template>

<script>
import popperModal from './popper-modal.vue';

export default {
    props: {
        requestedTitle: String
    },
    methods: {
        deleteRequested() {
            this.$emit('delete')
        }
    },
    components: {
        popperModal
    }
}
</script>