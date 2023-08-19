<template>
    <Loader v-if="loading || !productId"></Loader>
    <section v-else>
        <BreadCrumbs>
            <BreadCrumb :to="{ name: 'home' }">home</BreadCrumb>
            /
            <BreadCrumb :to="{ name: 'CatalogPage' }">catalog</BreadCrumb>
            /
            <BreadCrumb :to="{ name: 'CatalogPage', params: { productCategory: productCategory } }">category</BreadCrumb>
            /
            <BreadCrumb :to="{ name: '' }">{{ product.title }} {{ product.brand }}</BreadCrumb>
        </BreadCrumbs>
        <ProductCard :product="product" :productId="productId" :userId="userId" />
        <AboutItBlock></AboutItBlock>
        <RelatedProducts :productId="productId"></RelatedProducts>
        <SubscriptionBlock></SubscriptionBlock>
    </section>
</template>

<script>
import AboutItBlock from './Blocks/CatalogPage/AboutItBlock.vue';
import SubscriptionBlock from './Blocks/generalBlocks/SubscriptionBlock.vue';
import RelatedProducts from './Blocks/ProductPage/RelatedProducts.vue';
import ProductCard from './Blocks/ProductPage/ProductСard.vue'
import Loader from "@/components/app/Loader.vue";

import BreadCrumbs from './Blocks/generalBlocks/breadCrumbs/BreadCrumbs.vue';
import BreadCrumb from './Blocks/generalBlocks/breadCrumbs/BreadCrumb.vue';


import { auth } from "@/main";
import store from '@/store';


export default {
    name: "ProductPage",
    components: {
        BreadCrumbs,
        BreadCrumb,
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
        productCategory: {
            type: String,
            required: true,
            default: null,
        }
    },

    data() {
        return {
            userId: '',
            product: {}
        }
    },

    created() {
        this.loadProduct()
    },

    async mounted() {
        auth.onAuthStateChanged(async (user) => {
            await store.dispatch('auth/fetchUser', user);
            if (user !== null) {
                this.userId = user.uid
                // console.log(this.userId);
            }
        });

        console.log("id текущего товара: ", this.productId, this.productCategory);
    },

    watch: {
        productId: function () {
            this.loadProduct()
        }
    },

    methods: {
        async loadProduct() {
            let products = await store.dispatch('products/fetchProducts')
            this.product = products.find(product => product.id == this.productId)
            // console.log(this.product);
        },
    }
};

</script>
