<template lang="">
    <Popper class="popper">
    <div class="task-option-btn">
      <span class="attachments-icon icon-actions"></span>
      <p>Attachment</p>
    </div>
      <template #content="{close}">
      <div class="popper-content add-attachment">
        <popperModal title="Attach from..." @closeModal="close"/>
        <label>
      Computer
      <input type="file" @change="uploadAttachment" hidden />
    </label>
        <p>Attach a link</p>
        <input class="attach-link-input" v-model="link">
        <p v-if="link">Link name (optional)</p>
        <input v-if="link" class="attach-link-input" v-model="name">
        <button class="attach-link-button" @click="addAttachment">Attach</button>
      </div>
      </template>
    </Popper>
  </template>
<script>
import { uploadService } from '../services/upload.service.js'
import { utilService } from '../services/util.service';
import popperModal from './popper-modal.vue';
export default {
  data() {
    return {
      link: '',
      name:'',
      isImg: null
    }
  },
  methods: {
    addAttachment() {
      if (!this.link) return
      let attachment = {}
      attachment.id = utilService.makeId()
      attachment.createdAt = Date.now()
      attachment.link = this.link
      if(this.isImg) attachment.type = 'img'
      if(this.name) attachment.name = this.name
      this.$emit('addAttachment',attachment)
    },
    async uploadAttachment(ev) {
      try{
      const { secure_url} = await uploadService.uploadImg(ev)
      this.link = secure_url
      this.isImg = true
      }
      catch(err){
        console.log(err)
      }
    }
  },
  components: {
    popperModal
  }
}
</script>
<style lang="scss">
</style>