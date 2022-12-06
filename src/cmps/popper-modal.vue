<template>
    <header>
        <h1>{{ title }}</h1>
        <button class="back" v-if="hasBackBtn" @click="back">
            <span>
                <svg width="10" height="18" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.292893 8.29292L7.36396 1.22185C7.75449 0.831324 8.38765 0.831324 8.77817 1.22185C9.1687 1.61237 9.1687 2.24554 8.77817 2.63606L2.41421 9.00002L8.77818 15.364C9.1687 15.7545 9.1687 16.3877 8.77818 16.7782C8.38765 17.1687 7.75449 17.1687 7.36396 16.7782L0.292893 9.70713C-0.0976312 9.3166 -0.0976312 8.68344 0.292893 8.29292Z"
                        fill="grey"></path>
                </svg>
            </span>
        </button>
        <button class="close" @click="closeModal">
            <span>
                <svg width="14" height="14" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="grey"></path>
                </svg>
            </span>
        </button>
    </header>
</template>

<script>
export default {
    props: {
        title: String,
        hasBackBtn: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
            setTimeout(() => {
                this.$emit('closeMoreModal')
            }, 100)
        },
        back() {
            this.$emit('back')
        }
    }
}
</script>