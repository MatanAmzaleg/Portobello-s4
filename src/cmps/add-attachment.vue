<template lang="">
    <Popper class="popper">
    <div class="task-option-btn">
      <font-awesome-icon class="icon" icon="fa-solid fa-tag" />
      <p>Attachment</p>
    </div>
      <template #content>
      <div class="popper-content add-attachment label-picker">
        <popperModal title="Attach from..." />
        <label>
      Computer
      <input type="file" @change="uploadAttachment" hidden />
    </label>
        <p>Attach a link</p>
        <input class="attach-link-input" v-model="link">
        <button class="attach-link-button" @click="addAttachment">Attach</button>
      </div>
      </template>
    </Popper>
  </template>
<script>
import { uploadService } from '../services/upload.service.js'
import popperModal from './popper-modal.vue';
export default {
  data() {
    return {
      link: ''
    }
  },
  methods: {
    addAttachment() {
      if (!this.link) return
      this.$emit('addAttachment',this.link)
    },
    async uploadAttachment(ev) {
      const { secure_url} = await uploadService.uploadImg(ev)
      const Attachment = secure_url
      this.$emit('addAttachment', Attachment)
    }
  },
  components: {
    popperModal
  }
}
</script>
<style lang="scss">
.add-attachment{
    label {
    text-align: left;
    padding-bottom: 4px;
    margin-left: 12px;
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
    width: 93%;
    display: block;
    cursor: pointer;
  }

  p {
    text-align: left;
    margin-left: 12px;
  }

  input {
    margin-left: 10px;
    width: 93%;
    background-color: #fafbfc;
    border: none;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    line-height: 20px;
    outline: none;
    padding: 8px 12px;
    color: #172b4d;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    font-weight: 400;

    &:focus {
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #0079bf;
    }
  }

  .attach-link-button{
    border-radius: 3px;
    background-color: #091e420a;
    border: none;
    box-shadow: none;
    cursor: pointer;
    color: #172b4d;
    letter-spacing: 0.8px;
    margin: 15px 10px;
    line-height: 20px;
    padding: 8px 14px;
  }
  .attach-link-input{
    -webkit-appearance: none;
    background-color: var(--ds-background-input,#fafbfc);
    border: none;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px var(--ds-border-input,#dfe1e6);
    box-sizing: border-box;
    display: block;
    line-height: 20px;
    margin-bottom: 12px;
    outline: none;
    padding: 8px 12px;
    transition-duration: 85ms;
    transition-property: background-color,border-color,box-shadow;
    transition-timing-function: ease;
  }
}

</style>