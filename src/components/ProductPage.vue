<template>
  <BreadCrumbs></BreadCrumbs>
  <!-- <ProductCard :productId="productId" :product="product" :productCategory="productCategory"
    :productImg_url="productImg_url" :productGalery_url="productGalery_url" :productName="productName"
    :productDescription="productDescription" :productPrice="productPrice">
  </ProductCard> -->
  <ProductCard :productId="productId">
  </ProductCard>
  <AboutItBlock></AboutItBlock>
  <RelatedProducts :productId="productId"></RelatedProducts>
  <SubscriptionBlock></SubscriptionBlock>
</template>

<script>
import AboutItBlock from './Blocks/CatalogPage/AboutItBlock.vue';
import BreadCrumbs from './Blocks/generalBlocks/BreadCrumbs.vue';
import SubscriptionBlock from './Blocks/generalBlocks/SubscriptionBlock.vue';
import RelatedProducts from './Blocks/ProductPage/RelatedProducts.vue';
import ProductCard from './Blocks/ProductPage/ProductСard.vue'
// import { getProducts } from "../service/getAllProducts"
import { generateAllProducts } from "../service/getAllProducts"


export default {
  name: "ProductPage",
  components: {
    BreadCrumbs,
    ProductCard,
    AboutItBlock,
    SubscriptionBlock,
    RelatedProducts,
    SubscriptionBlock
  },
  props: {
    productId: {
      type: String,
      required: true,
      default: null,
    },
  },

  data() {
    return {

    }
  },

  mounted() {
    console.log("id текущего товара: ",this.productId);
  },
};

</script>


<style scoped lang="scss">
section {
  &:first-child {
    margin-top: 6.25rem;
  }
}
</style>