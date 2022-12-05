<template>
  <el-carousel indicator-position="outside" ref="carousel" :autoplay='false' @change="onChange">
    <el-carousel-item v-for="img in imgs" :key="imgs.indexOf(img)" :name="(imgs.indexOf(img)).toString()">
      <img :src="img" class="carousel-img" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    imgs: Array,
    carouselActiveItem: Number
  },
  methods: {
    onChange(idx){
      this.$emit('updateSelectedCarousel', idx)
    }
  },
  watch: {
    carouselActiveItem(newValue, old){
      this.$refs.carousel.setActiveItem(newValue.toString())
    },
    deep:true
  }
}
</script>

<style scoped>

</style>
