<template>
    <ButtonBlock :is-active="isActive" :button-name="buttonName" button-style="with-border-shadow text-xs px-[2%] py-[10%]"></ButtonBlock>
</template>
<script>
import ButtonBlock from './ButtonBlock.vue';

export default {
    name: "ButtonWithBorder",
    components: {
        ButtonBlock
    },
    props: {
        buttonName: {
            type: String,
            default: "Кнопка"
        },
        isActive: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    data() {
        return {
            
        }
    },
}
</script>
<style scoped lang="scss">
$dark-Gray: #333333;
$light-Gray: #ccc;
.with-border-shadow {
  background-color: white;
  color: $dark-Gray;
  outline: 0.02rem solid $light-Gray;
  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0.5rem 0.3rem 0 0.1rem white,
    0.5rem 0.3rem 0 0.125rem #ccc;
  transition: 0.3s ease-out;

  &:hover {
    background-color: $dark-Gray;
    color: white;
    outline: none;
    box-shadow: none;
  }
  // &:focus {
  //   background-color: $dark-Gray;
  //   color: white;
  //   outline: none;
  //   box-shadow: none;
  // }
}
.active {
    background-color: $dark-Gray;
    color: white;
    outline: none;
    box-shadow: none;
}
</style>