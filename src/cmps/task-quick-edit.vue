<template>
  <Popper>
    <section class="task-preview">
    <div
      class="cover"
      v-if="Object.keys(item.style).length !== 0 && item.style?.mode !== 'full'"
      :style="
        item.style?.bgColor
          ? { 'background-color': item.style.bgColor }
          : {
              'background-image': 'url( ' + item.style.imgUrl + ')',
              height: '80px',
              'background-position': 'center',
              'background-size': 'cover',
            }
      "
    ></div>
    <div
      class="cover"
      v-if="item.style?.mode === 'full'"
      :style="
        item.style?.bgColor
          ? { 'background-color': item.style.bgColor, height: '56px' }
          : {
              'background-image': 'url( ' + item.style.imgUrl + ')',
              height: '256px',
              'background-position': 'center',
              'background-size': 'cover',
            }
      "
    >
      <p class="item-title-full">{{ item.title }}</p>
    </div>
      <textarea placeholder="item.title" class="task-quick-edit-input"> </textarea>
      </section>
    <template #content="{ close }">
      <popperLabel />
    </template>
  </Popper>
</template>
<script>
import popperAddMember from "./popper-add-member.vue";
import popperCalendar from "./popper-calendar.vue";
import popperLabel from "./popper-label.vue";
export default {
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  created(){
    console.log('1',this.item)
  },
  components: {
    popperAddMember,
    popperCalendar,
    popperLabel,
  },
};
</script>
<style lang="scss">
.task-quick-edit-input{
    height: 100px;
    
}
</style>
