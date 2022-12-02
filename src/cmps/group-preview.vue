<template>
    <section class="group-preview">
        <router-link
                class="task-router-link"
                :to="`${currBoard._id}/g/${column.id}/t/${item.id}`"
                >{{ item.title }}</router-link>
              >
    </section>
</template>

<script>
export default{

}
</script>