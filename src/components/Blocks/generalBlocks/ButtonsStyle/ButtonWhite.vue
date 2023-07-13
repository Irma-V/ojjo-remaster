<template>
    <ButtonBlock :button-name="buttonName" button-style=" white px-[5%] py-[5%] mr-5 lg:mr-0"></ButtonBlock>
</template>
<script>
import ButtonBlock from './ButtonBlock.vue';

export default {
    name: "ButtonWhite",
    components: {
        ButtonBlock
    },
    props: {
        buttonName: {
            type: String,
            default: "Кнопка"
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped lang="scss">
$dark-Gray: #333333;
$light-Gray: #ccc;

.white {
    background-color: white;
    color: $dark-Gray;
    outline: 0.1rem solid $light-Gray;
    transition: 0.3s ease-out;

    &:hover {
        background-color: $dark-Gray;
        color: white;
        outline: 0.1rem solid white;
    }

    // inset 0 0 0 0 rgb(0 0 0 / 0%), 0.5rem 0.3rem 0 0.1rem white, 0.5rem 0.3rem 0 0.1em
}
</style>