<template>
    <section v-if="products.length > 0">
        <div class="content">
            <TitleBlock title="Products You May Like" description="We've got something else for you"></TitleBlock>
            <div class="catalog-block pb-[5%] font-sans font-thin tracking-tight text-base">
                <!-- <div class="catalog__wrapper flex flex-row justify-between"> -->
                <agile :options="productsOptions" :autoplay="true" :autoplaySpeed="3000" :isAutoplayPaused="true"
                    :dots="false" :nav-buttons="false">
                    <ProductCardItem v-for="product in relatedProducts" :key="product.id" :product-id="product.id"
                        :product="product.title" :product-name="product.brand" :product-price="product.price"
                        slider-show-type='single' :productImg_url="product.images[0]"></ProductCardItem>
                </agile>
                <!-- </div> -->
            </div>
        </div>
    </section>
    <!-- <div v-else>Nixua netu</div> -->
</template>
<script>
import TitleBlock from '../generalBlocks/TitleBlock.vue';
// import { products } from '@/database-mock';
import ProductCardItem from '../CatalogPage/ProductCardItem.vue';
import { api } from '@/api.js'
import { generateAllProducts } from "@/service/getAllProducts";
import { VueAgile } from 'vue-agile'

export default {
    name: "RelatedProducts",
    components: {
        TitleBlock,
        ProductCardItem,
        agile: VueAgile
    },
    props: {
        productId: {
            type: Number,
        }
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
            },
        }
    },
    async created() {
        // await api.products
        //     .getProducts()
        //     .then((res) => {
        //         this.products = res.products
        //         // console.log(this.products);
        //     })

        this.products = await generateAllProducts()

    },

    computed: {
        relatedProducts() {
            let currentProduct = this.products.find(product => product.id == this.productId)
            // console.log(currentProduct, 11111);
            // console.log(this.products, 22222);

            /* Получить список товаров, подходящих по цене, бренду и категории */
            let filteredData = this.products.filter(item => {
                let isValid = true
                if ((item.price === currentProduct.price) || (item.brand === currentProduct.brand) || (item.category === currentProduct.category)) {
                    if ((item.id === currentProduct.id)) {
                        isValid = false
                    }
                    return isValid
                }

            })
            console.log(filteredData);
            return filteredData
        }
    }

}
</script>
<style scoped lang="scss"></style>