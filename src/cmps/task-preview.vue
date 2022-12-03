<template>
    <section class="task-preview">
        <div class="labels">
            <div class="label" v-for="label in item.labels"></div>
        </div>
        <span class="task-router-link">{{ item.title }}</span>
    </section>
</template>

<script>
export default{
    props:{
        item:Object
    }
}
</script>