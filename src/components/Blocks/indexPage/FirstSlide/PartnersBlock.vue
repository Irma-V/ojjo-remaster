<template>
  <section>
    <div class="content">
      <div class="partners-block">

        <agile :slidesToShow="6" :autoplay="true" :navButtons="false" :autoplaySpeed="5000" :options="partnerOptions">

          <div v-for="partnerItem in partnersLogos" :key="partnerItem" class="partners-item border-r-[0.1rem] px-[2%]">
            <img :src="partnerItem.logo_url" alt="">
          </div>
        </agile>
      </div>
    </div>
  </section>
</template>

<script>
import { partnersLogos } from "@/database-mock"
import { VueAgile } from 'vue-agile'

export default {
  name: "PartnersBlock",
  components: {
    agile: VueAgile
  },
  props: {

  },
  data() {
    return {
      partnersLogos: partnersLogos,

      partnerOptions: {
        responsive: [
          {
            breakpoint: 50,
            settings: { slidesToShow: '2' }
          },
          {
            breakpoint: 380,
            settings: { slidesToShow: '2' }
          },
          {
            breakpoint: 600,
            settings: { slidesToShow: '2' }
          },
          {
            breakpoint: 625,
            settings: { slidesToShow: '3' }
          },
          {
            breakpoint: 755,
            settings: { slidesToShow: '4' }
          },
          {
            breakpoint: 950,
            settings: { slidesToShow: '5' }
          },
          {
            breakpoint: 1024,
            settings: { slidesToShow: '5.5' }
          },
          {
            breakpoint: 1210,
            settings: { slidesToShow: '6' }
          },
          {
            breakpoint: 1440,
            settings: { slidesToShow: '6' }
          },
        ]
      },
    }
  }
}
</script>
<style scoped lang="scss"></style>

<!-- 
  <ul class="partners-block__wrapper flex flex-row justify-between">
    <li v-for="partnerItem in partnersLogos" :key="partnerItem" class="partners-item border-r-[0.1rem] last:border-r-0 px-[2%]">
      <img :src="partnerItem.logo_url" alt="">
    </li>
  </ul> 
-->