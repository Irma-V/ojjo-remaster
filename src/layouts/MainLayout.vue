<template>
    <div>
        <VHeader></VHeader>
        <div class="container min-h-full max-w-[120rem] flex flex-col">
            <main class="min-h-full flex flex-col">
                <router-view />
            </main>
            <FooterBlock></FooterBlock>
        </div>
    </div>
</template>

<script>
import FooterBlock from "@/components/v-Footer.vue";
import VHeader from "@/components/v-Header.vue";
import store from '@/store';
import messages from '@/utils/messages'

export default {
    name: "MainLayout",
    components: {
        FooterBlock,
        VHeader,
    },
    props: {},
    data() {
        return {

        }
    },async mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
        // if (!Object.keys(store.getters.info).length) {
        if (store.getters.infoIsEmpty) {
            await store.dispatch('auth/fetchInfo')
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