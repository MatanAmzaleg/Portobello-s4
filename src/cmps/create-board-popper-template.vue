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
                                <button title="Custom image">
                                </button>
                            </li>
                            <!-- <span>
                                <span
                                    style="--icon-primary-color:var(--ds-icon-inverse, #FFFFFF); --icon-secondary-color: inherit;">
                                    <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z"
                                            fill="currentColor">
                                        </path>
                                    </svg>
                                </span>
                            </span> -->
                        </ul>
                        <ul>
                            <li v-for="clr in colors" class="li-color" :class="`clr-${clr}`">
                                <button :title="clr.charAt(0).toUpperCase() + clr.slice(1)">
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
                <input ref="boardName"/>
            </div>
        </div>
    </div>
</template>

<script>
import popperModalHeaderVue from './popper-modal.vue';

export default {
    props:{
        isModalOpen: Boolean
    },
    data() {
        return {
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
            ]
        }
    },
    components: {
        popperModalHeaderVue,
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
