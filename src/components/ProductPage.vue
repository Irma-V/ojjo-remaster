<template>
    <Loader v-if="loading || !productId"></Loader>
    <section v-else>
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
    </section>
</template>

<script>
import AboutItBlock from './Blocks/CatalogPage/AboutItBlock.vue';
import BreadCrumbs from './Blocks/generalBlocks/BreadCrumbs.vue';
import SubscriptionBlock from './Blocks/generalBlocks/SubscriptionBlock.vue';
import RelatedProducts from './Blocks/ProductPage/RelatedProducts.vue';
import ProductCard from './Blocks/ProductPage/ProductСard.vue'
// import { getProducts } from "../service/getAllProducts"
import { generateAllProducts } from "../service/getAllProducts"
import Loader from "@/components/app/Loader.vue";

export default {
    name: "ProductPage",
    components: {
        BreadCrumbs,
        ProductCard,
        AboutItBlock,
        SubscriptionBlock,
        RelatedProducts,
        SubscriptionBlock,
        Loader,
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
        console.log("id текущего товара: ", this.productId);
    },
};

</script>
