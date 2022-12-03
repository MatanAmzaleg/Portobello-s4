<template>
    <div class="member-picker">
        <popperModalHeaderVue title="Create board" hasBackBtn="true"/>
        <!-- <header class="header-picker">
            <h1>Create board</h1>
            <button class="back">
                <span>
                    <svg width="10" height="18" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.292893 8.29292L7.36396 1.22185C7.75449 0.831324 8.38765 0.831324 8.77817 1.22185C9.1687 1.61237 9.1687 2.24554 8.77817 2.63606L2.41421 9.00002L8.77818 15.364C9.1687 15.7545 9.1687 16.3877 8.77818 16.7782C8.38765 17.1687 7.75449 17.1687 7.36396 16.7782L0.292893 9.70713C-0.0976312 9.3166 -0.0976312 8.68344 0.292893 8.29292Z"
                            fill="grey"></path>
                    </svg>
                </span>
            </button>
            <button class="close">
                <span>
                    <svg width="14" height="14" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                            fill="grey"></path>
                    </svg>
                </span>
            </button>
        </header> -->
        <div class="content">
            <div class="content-board-img">
                <div class="board-img">
                    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                        alt="" role="presentation">
                </div>
            </div>
            <div class="board-background">
                <label for="background-picker">Background</label>
                <div>
                    <ul class="background-imgs">
                        <li class="li-img">
                            <button title="Custom image"
                                style="background-image: url(&quot;https://images.unsplash.com/photo-1669250740534-1e26fb77051d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot;);">
                                <span>
                                    <span
                                        style="--icon-primary-color:var(--ds-icon-inverse, #FFFFFF); --icon-secondary-color: inherit;">
                                        <svg width="24" height="24" role="presentation" focusable="false"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z"
                                                fill="currentColor">
                                            </path>
                                        </svg>
                                    </span>
                                </span>
                            </button>
                        </li>
                        <li class="li-img">
                            <button title="Custom image"
                                style="background-image: url(&quot;https://images.unsplash.com/photo-1669123549422-22f62dee014d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot;);">
                            </button>
                        </li>
                        <li class="li-img">
                            <button title="Custom image"
                                style="background-image: url(&quot;https://images.unsplash.com/photo-1669327195331-cd47e0d5eef0?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot;);">
                            </button>
                        </li>
                        <li class="li-img">
                            <button title="Custom image"
                                style="background-image: url(&quot;https://images.unsplash.com/photo-1669327857374-43aaa93dec95?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjcwMDA1OTQ1&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400&quot;);">
                            </button>
                        </li>
                    </ul>
                    <ul>
                        <li class="li-color">
                            <button title="Blue" style="background-color: rgb(0, 121, 191);">
                            </button>
                        </li>
                        <li class="li-color">
                            <button title="Orange" style="background-color: rgb(210, 144, 52);">
                            </button>
                        </li>
                        <li class="li-color">
                            <button title="Green" style="background-color: rgb(81, 152, 57);">
                            </button>
                        </li>
                        <li class="li-color">
                            <button title="Red" style="background-color: rgb(176, 70, 50);">
                            </button>
                        </li>
                        <li class="li-color">
                            <button title="Purple" style="background-color: rgb(137, 96, 158);">
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
        </div>
    </div>
</template>

<script>
import popperModalHeaderVue from './popper-modal.vue';

export default {
    data() {
        return {
            color: [
                "#00aecc",
                "#519839",
                "#4bbf6b",
                "#d29034",
                "#b04632",
                "#89609e",
                "#cd5a91",
                "#838c91",
            ],
            img: []
        }
    },
    components: {
        popperModalHeaderVue,
    }
}
</script>
