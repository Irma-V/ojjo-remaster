<template>
    <li class="capitalize">
        <router-link v-bind="$attrs">
            <slot />
        </router-link>
    </li>
</template>

<script>
export default {
    name: "componentName",
    components: {},
    props: {},
    data() {
        return {

        }
    },
}
</script>

<style scoped lang="scss">
li:first-child{
    margin: 0 3rem 0 0;
}

li {
    text-decoration: underline;
    margin: 0 3rem;
}

li:last-child {
    text-decoration: none;
    margin: 0 0 0 3rem;
    a{
        cursor: auto;
    }
}
</style>