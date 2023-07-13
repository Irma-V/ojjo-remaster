<template>
    <ButtonBlock :button-name="buttonName" button-style="dark-gray px-[5%] py-[5%] "></ButtonBlock>
</template>
<script>
import ButtonBlock from './ButtonBlock.vue';

export default {
    name: "ButtonDarkGray",
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
.dark-gray {
  background-color: $dark-Gray;
  color: white;
  outline: 0.1rem solid white;
  transition: 0.3s ease-out;

  &:hover {
    background-color: #33333378;
    // color: $dark-Gray;
    outline: 0.1rem solid $light-Gray;
  }
}
</style>