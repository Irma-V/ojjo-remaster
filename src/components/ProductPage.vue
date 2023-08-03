<template>
    <Loader v-if="loading || !productId"></Loader>
    <section v-else>
        <BreadCrumbs></BreadCrumbs>
        <ProductCard :productId="productId" :userId="userId" />
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
import Loader from "@/components/app/Loader.vue";

import { auth } from "@/main";
import store from '@/store';


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
            userId: '',
        }
    },

    async mounted() {
        auth.onAuthStateChanged(async (user) => {
            await store.dispatch('auth/fetchUser', user);
            if (user !== null) {
                this.userId = user.uid
                // console.log(this.userId);
            }
        });

        console.log("id текущего товара: ", this.productId);
    },
};

</script>
