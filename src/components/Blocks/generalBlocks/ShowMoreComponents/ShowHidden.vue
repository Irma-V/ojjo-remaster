<template>
    <div class="hide-and-show-content" :class="hideAndShowStyle">
        <div ref="mainContent" class="hide-and-show__main-content" :class="mainContentStyle">
            <slot name="mainContent"></slot>
        </div>
        <div class="show-more cursor-pointer" :class="showMoreButtonStyle" @click="showFullContent()">
            <slot name="showMoreButton"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "ShowHidden",
    components: {

    },
    props: {
        showHeight: {
            type: Number,
            // default: 15,
        },
        hideAndShowStyle: {
            type: String,
            default: '',
        },
        mainContentStyle: {
            type: String,
            default: '',
        },
        showMoreButtonStyle: {
            type: String,
            default: '',
        },
    },
    data() {
        return {

        }
    },
    mounted() {
        this.hideContent()

    },

    methods: {
        litleContent() {
            return this.$refs.mainContent.style.maxHeight < this.showHeight
        },
        hideButton() {
            return this.$refs.mainContent.nextElementSibling.style.display = "none"
        },
        hideContent() {

            this.$refs.mainContent.style.maxHeight = this.showHeight + "rem"
            this.$refs.mainContent.style.overflow = "hidden"
            // console.log(this.$refs.mainContent.style.maxHeight);
            // console.log(this.$refs.mainContent.firstChild);

        },

        showFullContent() {
            if (this.hideContent) {
                this.$refs.mainContent.style.maxHeight = "max-content"
                this.$refs.mainContent.style.overflow = "none"
                this.hideButton()
            }
        }
    }
}
</script>
<style scoped lang="scss">
.hide-and-show-content {
    // .hide-and-show__main-content {
    //     background-color: wheat;
    //     transition: all 1s ease-out;

    //     &:hover {
    //         background-color: white;
    //     }
    // }

    .show-more {}
}
</style>