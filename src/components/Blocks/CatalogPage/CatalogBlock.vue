<template>
    <article>
        <div class="content">
            <div class="catalog-block pb-[5%] font-sans font-thin tracking-tight text-base">
                <div class="catalog__wrapper flex flex-row flex-wrap items-center">
                    <ProductCardItem productCardItemStyle=" basis-full min-[375px]:basis-1/2 sm:basis-1/3"
                        v-for="product in products" :key="product" :product-id="product.id" :product="product.title"
                        :product-name="product.brand" :product-price="product.price + ' $'" slider-show-type='slider'
                        :galery="product.images" :productCategory="product.category">
                    </ProductCardItem>
                </div>
            </div>
            
            <div v-if="showMoreButton"
                class="load-more flex justify-center disabled:opacity-10">
                <div class="load-more__wrapper w-1/2 min-[769px]:w-1/4">
                    <ButtonDarkGray button-name="Load More" @click="$emit('loadMore')"></ButtonDarkGray>
                </div>
            </div>

        </div>
    </article>
</template>
<script>
import ButtonDarkGray from '@/components/Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import ProductCardItem from './ProductCardItem.vue';

/* Uncomment if you need to get Products data from @/database-mock */
// import { products } from '@/database-mock';

export default {
    name: "CatalogBlock",
    components: {
        ButtonDarkGray,
        ProductCardItem
    },
    props: {
        productCategory: {
            type: String,
            required: false,
            default: null,
        },
        products: {
            type: Array,
            required: false,
            default: []
        },
        total: { type: Number },
        lim: { type: Number },
        filteredCount: { type: Number },
    },
    emits: {
        loadMore: {
            required: true,
        },
    },
    data() {
        return {
            // productsMax: this.products.length
            /* Uncomment if you need to get Products data from @/database-mock */
            // items: [],
            // limit: 6,
            // offset: 0,
            // step: 6
        }
    },
    computed: {
        productsMax() {
            return this.products.length
        },
        showMoreButton() {
            // если выведены все товары, то скрываем кнопку
            if (this.filteredCount === this.productsMax) {
                return false
            }
            return (!this.productCategory && this.productsMax < this.total && (this.lim - 1) < this.productsMax)
                || (this.productCategory && this.productsMax < this.filteredCount && (this.lim - 1) < this.productsMax)
        }
    }

    /* Uncomment if you need to get Products data from @/database-mock */
    // created() {
    //     this.items = this.filteredProducts().slice(this.offset, this.limit)
    // },
    // mounted() {
    // if (this.items.length < 6) {
    //     document.querySelector('.load-more').style.display = 'none'
    // }

    // },
    // methods: {
    //     loadMore() {
    //         let LoadMoreBlock = document.querySelector('.load-more')
    //         this.offset += this.step
    //         this.limit += this.step
    //         let newItems = this.filteredProducts().slice(this.offset, this.limit)
    //         this.items.push(...newItems)
    //         if (this.items.length === this.filteredProducts().length || this.items.length <= 6) {
    //             LoadMoreBlock.style.display = 'none'
    //         }
    //     },
    //     filteredProducts() {
    //         if (this.productCategory) {
    //             return products.filter(product => product.productCategory === this.productCategory)
    //         }
    //         return products
    //     },
    // },
}
</script>
<style scoped lang="scss"></style>