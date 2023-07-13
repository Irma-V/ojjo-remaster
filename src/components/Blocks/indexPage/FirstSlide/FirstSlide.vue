<template>
  <div class="first-slide-block">
    <WelcomeBlock></WelcomeBlock>
    <hr>
    <PartnersBlock></PartnersBlock>
  </div>
</template>

<script>
import PartnersBlock from '../FirstSlide/PartnersBlock.vue';
import WelcomeBlock from '../FirstSlide/WelcomeBlock.vue';

export default {
  name: "FirstSlide",
  components: {
    PartnersBlock,
    WelcomeBlock
  }
};
</script>

<style scoped lang="scss">
.first-slide-block {
  $mainBackground: url(~@/assets/img/background/bgc.png);
  background-image: $mainBackground;
  background-position: top, center;
  background-repeat: no-repeat;
  // margin: 0 auto;
  // padding: 0;
}
</style>
