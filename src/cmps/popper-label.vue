<template>
  <div class="popper-content label-picker">
    <popperModal title="Labels" v-if="!isEditMode" @closeModal="closeModal" />
    <popperModal v-if="isEditMode" title="Edit label" @closeModal="closeModal"></popperModal>
    <input ref="focusInput" @input="filterLabels" v-model="filterBy.txt" class="search-input" v-if="!isEditMode"
      placeholder="Search labels..." type="search" />
    <div class="labels">
      <div v-if="isEditMode" class="chosen-label">
        <label class="label-color" :style="{ 'background-color': chosenLabel.color + '60' }">
          <div class="circle" :style="{ 'background-color': chosenLabel.color }"></div>
          {{ chosenLabel.title }}
        </label>
      </div>
      <p class="labels-title" v-if="!isEditMode">Labels</p>
      <p class="labels-title" v-if="isEditMode">Title</p>
      <input v-model="chosenLabel.title" class="search-input" v-if="isEditMode" type="search" />
      <p class="labels-title" v-if="isEditMode">Select a color</p>
      <div v-if="isEditMode" class="labels">
        <span v-for="label in filteredLabels" @click="setLabelColor(label.color)" class="label-color"
          :style="{ 'background-color': label.color }"></span>
      </div>
      <button class="remove-color-btn" @click="onRemoveColor" v-if="isEditMode"> x Remove color</button>
      <hr v-if="isEditMode">
      <div v-if="isEditMode" class="buttons-section">
        <button class="save-btn" @click="onSaveLabel">Save</button>
        <button class="delete-btn" @click="onDeleteLabel">Delete</button>
      </div>
      <li v-if="!isEditMode" v-for="label in filteredLabels">
        <div class="label">
          <input class="checkbox-helper" :checked="checkLabel(label.id)" @input="addLabel(label.id)" type="checkbox" />
          <label class="label-color" :style="{ 'background-color': label.color + '60' }">
            <div class="circle" :style="{ 'background-color': label.color }"></div>
            <p class="title">{{ label.title }}</p>
          </label>
          <font-awesome-icon @click="goEditMode(label)" class="pen-btn" icon="fa-solid fa-pencil" />
        </div>
      </li>
      <button class="create-label-btn" v-if="!isEditMode" @click="goCreateMode">Create new label</button>
    </div>
    <button @click="(isEditMode = false), (chosenLabel = null)" v-if="isEditMode" class="return-btn">
      <font-awesome-icon class="return-icon" icon="fa-solid fa-chevron-left" />
    </button>
  </div>
</template>
<script>
import popperModal from "./popper-modal.vue";
import { utilService } from "../services/util.service"
import { eventBus } from "../services/event-bus.service";
export default {
  props: {
    labelIds: Array,
  },
  data() {
    return {
      isEditMode: null,
      chosenLabel: null,
      labelTitle: "",
      currBoard: null,
      filteredLabels: null,
      filterBy: { txt: "" },
    };
  },
  created() {
    this.currBoard = JSON.parse(JSON.stringify(this.getCurrBoard))
    this.filteredLabels = this.currBoard.labels
    console.log('first')
    eventBus.on('update-focus', this.updateInputFocus)
  },
  methods: {
    addLabel(labelId) {
      let labelIdx = this.labelIds.findIndex((id) => id === labelId);
      if (labelIdx === -1) {
        this.labelIds.push(labelId);
      } else {
        this.labelIds.splice(labelIdx, 1);
      }
      this.$emit("save-label", this.labelIds);
    },
    checkLabel(id) {
      if (!this.labelIds?.length) return
      return this.labelIds?.includes(id);
    },
    goEditMode(label) {
      this.chosenLabel = label;
      console.log(this.chosenLabel);
      this.isEditMode = true;
      console.log();
    },
    goCreateMode() {
      this.chosenLabel = this.chosenLabel = { color: "#DFE1E6", title: "" };
      console.log(this.chosenLabel);
      this.isEditMode = true;
      console.log();
    },
    setLabelColor(color) {
      console.log(color);
      this.chosenLabel.color = color
    },
    onRemoveColor() {
      this.chosenLabel = { color: "#DFE1E6", title: "" }
    },
    onSaveLabel() {
      if (!this.chosenLabel.id) {
        this.chosenLabel.id = utilService.makeId()
        this.currBoard.labels.push(this.chosenLabel)
      } else {
        const labelIdx = this.currBoard.labels.findIndex(l => l.id === this.chosenLabel.id)
        this.currBoard.labels[labelIdx] = this.chosenLabel
      }
      this.$emit("updateBoard", this.currBoard)
      this.isEditMode = false
    },
    onDeleteLabel() {
      if (!this.chosenLabel.id) {
        this.isEditMode = false
        return
      } else {
        let idx = this.labelIds.findIndex(l => l.id === this.chosenLabel.id)
        this.labelIds.splice(idx, 1)
        this.$emit('saveLabels', this.labelIds)

        let idx1 = this.currBoard.labels.findIndex(l => l.id === this.chosenLabel.id)
        this.currBoard.labels.splice(idx1, 1)
        const newBoard = this.currBoard.groups.map(group => {
          return group.tasks.map(task => {
            task.labelIds = task.labelIds.filter(labledId => labledId !== this.chosenLabel.id)
            return task
          })
        })
        this.$store.dispatch({ type: 'updateBoard', board: this.currBoard })
        this.isEditMode = false
      }
    },
    filterLabels() {
      console.log(this.filterBy.txt);
      const regex = new RegExp(this.filterBy.txt, "i")
      this.filteredLabels = this.currBoard.labels.filter(l => regex.test(l.title))
      console.log(this.filteredLabels);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    updateInputFocus() {
      setTimeout(() => {
        this.$refs.focusInput.focus();
      }, 50);
    }
  },
  components: {
    popperModal,
  },
  computed: {
    getCurrBoard() {
      return this.$store.getters.currBoard
    }
  }
};
</script>
<style lang="">
    
</style>