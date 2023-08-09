<template>
    <article>
        <div class="content">
            <!-- <div>BreadCrumbs</div> -->
            <ul class="flex flex-row justify-start items-center mx-[20%]">
                <slot/>
            </ul>
            
        </div>
    </article>
</template>
<script>

// import VBreadcrumbs from "vuetify/lib/components/VBreadcrumbs";
export default {
    name: "BreadCrumbs",
    props: {
        items: {
            type: ArrayBuffer,
            required: true
        }
    },
    data() {
        return {

        }
    },

    mounted() {
    },

    computed: {
        breads() {}

    },

    methods: {

    }
}
</script>
