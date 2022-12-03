<template>
    <div class="popper-content">
        <popperModalHeaderVue title="Create board" :hasBackBtn="true" />
        <div class="content">
            <div class="content-board-img">
                <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                        alt="" role="presentation">
                </div>
            </div>
            <div class="board-background">
                <label>Background</label>
                <div>
                    <ul class="background-imgs">
                        <li v-for="img in imgs" class="li-img"
                            :style="{ 'background-image': 'url(' + img.src + ')', 'background-size': 'cover' }">
                            <button title="Custom image" @click="updateUrlImg(img.src)">
                                <span v-if="selectedBackground.imgUrl === img.src">
                                    <selectedSvg />
                                </span>
                            </button>
                        </li>
                    </ul>
                    <ul>
                        <li v-for="clr in colors" class="li-color" :class="`clr-${clr}`">
                            <button :title="clr.charAt(0).toUpperCase() + clr.slice(1)" @click="updateBgColor(clr)">
                                <span v-if="selectedBackground.bgColor === clr">
                                    <selectedSvg />
                                </span>
                            </button>
                        </li>
                        <li class="li-color more">
                            <button>
                                <svg width="100%" height="13" role="presentation" focusable="false" viewBox="0 1 24 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                                        fill="#42526E">
                                    </path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="board-title">
                <label>Board title <span>*</span></label>
                <input ref="boardName" @input="updateBoardName" />
            </div>
            <div class="board-create">
                <button :class="boardTitle !== '' ? 'create-allowed' : 'create-not-allowed'" @click="addBoard">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import popperModalHeaderVue from './popper-modal.vue';
import selectedSvg from './selected-svg.vue'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'

export default {
    props: {
        isModalOpen: Boolean
    },
    data() {
        return {
            selectedBackground: {
                imgUrl: "",
                bgColor: "",
            },
            colors: [
                "blue",
                "orange",
                "green",
                "red",
                "purple",
            ],
            imgs: [
                {
                    id: "1",
                    src: "https://images.unsplash.com/photo-1669250740534-1e26fb77051d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
                },
                {
                    id: "2",
                    src: "https://images.unsplash.com/photo-1669123549422-22f62dee014d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
                },
                {
                    id: "3",
                    src: "https://images.unsplash.com/photo-1669327195331-cd47e0d5eef0?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
                },
                {
                    id: "4",
                    src: "https://images.unsplash.com/photo-1669327857374-43aaa93dec95?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot"
                }
            ],
            boardTitle: ""
        }
    },
    components: {
        popperModalHeaderVue,
        selectedSvg,
    },
    methods: {
        updateUrlImg(url) {
            this.selectedBackground.imgUrl = url
            this.selectedBackground.bgColor = ""
        },
        updateBgColor(color) {
            this.selectedBackground.bgColor = color
            this.selectedBackground.imgUrl = ""
        },
        updateBoardName(ev) {
            this.boardTitle = ev.target.value
        },
        async addBoard() {
            try {
                const board = {
                    title: this.boardTitle,
                    style: this.selectedBackground
                }
                await this.$store.dispatch({ type: 'createNewBoard', board: board })
                showSuccessMsg('Board added')
                this.boardToAdd = boardService.getEmptyBoard()
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add board')
            }
        },
    },
    watch: {
        isModalOpen(newValue, old) {
            setTimeout(() => {
                this.$refs.boardName.focus()
            }, 100)
        }
    }
}
</script>
