<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="img in imgs" :key="img">
      <img :src="img" class="carousel-img"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "carousel",
  props: {
    imgs: Array
  }
}
</script>

<style scoped>
</style>
