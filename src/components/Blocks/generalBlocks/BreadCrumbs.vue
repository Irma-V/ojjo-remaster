<template>
    <section>
        <div class="content">
            <div @click="this.toCamelCase">BreadCrumbs</div>
            <!-- <BBreadcrumb>
                <BBreadcrumbItem>home</BBreadcrumbItem>
                <BBreadcrumbItem>home</BBreadcrumbItem>
                <BBreadcrumbItem>home</BBreadcrumbItem>
            </BBreadcrumb> -->
        </div>
    </section>
</template>
<script>


// import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue'
export default {
    name: "BreadCrumbs",
    components: {
        //    BBreadcrumb,
        //    BBreadcrumbItem,
    },
    props: {

    },
    data() {
        return {

        }
    },

    methods: {
        
    }
}
</script>
<style scoped lang="scss"></style>