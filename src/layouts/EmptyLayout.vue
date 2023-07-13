<template>
    <!-- <VHeader /> -->

    <div class="layout-content">
        <router-view />
    </div>
</template>

<script>
import VHeader from '@/components/v-Header.vue';
import store from '@/store';
import messages from '@/utils/messages'

export default {
    name: "EmptyLayout",
    components: {
        VHeader
    },
    props: {},
    data() {
        return {

        }
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }

    },
    computed: {
        error(){
            return store.getters.error
        }
    },
    watch: {
        error(fbError) {
            // console.log(fbError); /* содержимое ошибки попадает из ветки catch каждого метода, вызываемого из store в компонентах vue */
            this.$error(messages[fbError])
        }
    }
}
</script>

<style scoped lang="scss"></style>