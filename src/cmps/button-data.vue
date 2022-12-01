<template>
    <button selected="" class="button-data" :class="isSelected" @click="$emit('setSelectedGuide', title)">
        <div>
            <h3>{{ title }}</h3>
            <p>{{ content }}</p>
        </div>
    </button>
</template>

<script>

export default {
    props: {
        title: String,
        content: String,
        selectedGuide: String
    },
    data() {
        return {
            selected: false
        }
    },
    computed: {
        isSelected() {
            console.log('this.selectedGuide', this.selectedGuide)
            return this.selectedGuide === this.title? 'is-selected' : ''
        }
    }
}
</script>