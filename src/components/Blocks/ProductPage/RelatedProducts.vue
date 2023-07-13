<template>
    <section v-if="products.length > 0">
        <div class="content">
            <TitleBlock title="Products You May Like" description="We've got something else for you"></TitleBlock>
            <div class="catalog-block pb-[5%] font-sans font-thin tracking-tight text-base">
                <!-- <div class="catalog__wrapper flex flex-row justify-between"> -->
                <Agile :slidesToShow="3" :infinite="true" :navButtons="false" :autoplay="true" :autoplaySpeed="5000"
                    :isAutoplayPaused="true" :options="productsOptions">
                    <ProductCardItem v-for="product in products" :key="product" :product-id="product.id"
                        :product="product.title" :product-name="product.brand" :product-price="product.price"
                        slider-show-type='single' :productImg_url="product.images[0]"></ProductCardItem>
                </agile>
                <!-- </div> -->
            </div>
        </div>
    </section>
    <div v-else>Nixua netu</div>
</template>
<script>
import TitleBlock from '../generalBlocks/TitleBlock.vue';
// import { products } from '@/database-mock';
import ProductCardItem from '../CatalogPage/ProductCardItem.vue';
import Agile from 'vue-agile/src/Agile.vue';
import { api } from '@/api.js'

export default {
    name: "RelatedProducts",
    components: {
        TitleBlock,
        ProductCardItem,
        Agile
    },
    props: {
    },
    data() {
        return {
            products: [],
            productsOptions: {
                responsive: [
                    {
                        breakpoint: 50,
                        settings: { slidesToShow: '1' }
                    },
                    {
                        breakpoint: 380,
                        settings: { slidesToShow: '1' }
                    },
                    {
                        breakpoint: 600,
                        settings: { slidesToShow: '1' }
                    },
                    {
                        breakpoint: 625,
                        settings: { slidesToShow: '1.5' }
                    },
                    {
                        breakpoint: 755,
                        settings: { slidesToShow: '2' }
                    },
                    {
                        breakpoint: 950,
                        settings: { slidesToShow: '2.5' }
                    },
                    {
                        breakpoint: 1024,
                        settings: { slidesToShow: '3' }
                    },
                    {
                        breakpoint: 1210,
                        settings: { slidesToShow: '3' }
                    },
                    {
                        breakpoint: 1440,
                        settings: { slidesToShow: '3' }
                    },
                ]
            }
        }
    },
    async created() {
        await api.products
            .getProducts()
            .then((res) => {
                this.products = res.products
                // console.log(this.products);
            })
    },

}
</script>
<style scoped lang="scss"></style>