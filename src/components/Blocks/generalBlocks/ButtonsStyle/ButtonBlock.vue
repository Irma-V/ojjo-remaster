<template>
    <button ref="btn" isActive class="uppercase font-thin w-full h-full"
            :class="[ isActive ? 'active' : '', buttonStyle]"
        >
        {{ buttonName }}
        </button>
</template>
<script>
export default {
    name: "ButtonBlock",
    components: {

    },
    props: {
        buttonName: {
            type: String,
            default: "Кнопка",
        },
        buttonStyle: {
            type: String,
            default: "dark-gray",
        },
        isActive: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    emits: {

    },
    data() {
        return {
            // isActive: false,
        }
    },
    methods: {
        // activated() {
        //     if (this.isActive) { 
        //         this.isActive = false
        //         this.$refs.btn.classList.remove("active") 
        //         console.log(this.$refs.btn.classList);
        //     } else {
        //         this.isActive = true
        //         this.$refs.btn.classList.add("active")
        //         console.log(this.$refs.btn.classList);
        //     }
        // }
        // не забудь про ref="btn" isActive @click="activated()"
    }
}
</script>
<style scoped lang="scss">

</style>