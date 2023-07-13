<template>
    <section>
        <div class="content">
            <!-- <div class="test-block flex flex-row flex-wrap justify-between">
                <ProductCardItem v-for="product in rings" :key="item" productCardItemStyle="basis-1/3"
                    :product="product.product" :product-id="product.productId" :product-name="product.productName"
                    :product-price="product.productPrice"
                    slider-show-type='single' :productImg_url="product.productImg_url"
                    >
                </ProductCardItem>
            </div> -->

            <!-- <agile :slidesToShow="1" :infinite="false">
                <img src="~@/assets/img/catalog/earrings/earring01/earring01_01.png" alt="">
                <img src="~@/assets/img/catalog/rings/ring01/ring01_01.png" alt="">
                <img src="~@/assets/img/catalog/pendants/pendant01/pendant01_01.jpg" alt="">
            </agile> -->


            <LoginPage></LoginPage>
        </div>
    </section>
</template>

<script>
import ProductCardItem from './Blocks/CatalogPage/ProductCardItem.vue';
import { products } from '@/database-mock'
import { VueAgile } from 'vue-agile'
// import LoginPage from './LoginPage.vue';
// import {isNullOrUndefined } from '../example'

export default {
    name: "TestBlock",
    components: {
    ProductCardItem,
    agile: VueAgile,
    LoginPage
},
    data() {
        return {
            products: products
        }
    },
    computed: {
        pendants() {
            return this.products.filter(product => product.productCategory === 'pendants')
        },

        rings() {
            return this.products.filter(product => product.productCategory === 'rings')
        }

    },

    // created() {
    //     console.log(this.showPendants()); 
    // },

    methods: {

    },
}
</script>