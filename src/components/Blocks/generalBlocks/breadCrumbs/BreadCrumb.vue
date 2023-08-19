<template>
    <li class="capitalize text-center">
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
    padding: 0 3% 0 0;
}

li {
    text-decoration: underline;
    padding: 0 3%;
}

li:last-child {
    color: rgb(89, 163, 139);;
    text-decoration: none;
    padding: 0 0 0 3%;
    a{
        cursor: auto;
    }
}
</style>