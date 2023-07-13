<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default {
    name: "App",
    components: {
        EmptyLayout,
        MainLayout,
    },
    computed: {
        layout() {
            console.log(this.$route.meta.layout);
            return (this.$route.meta.layout || 'empty') + '-layout'
        },
    },
};
</script>

<style scoped lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>

<!-- *.vue-template

<template> </template>

<script>
export default {
    name: "componentName",
    components: {},
    props: {},
    data () {
        return {
            
        }
    },
}
</script>
-->