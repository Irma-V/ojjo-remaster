<template>
    <FilterBlock @select-change="filterChangeHandler"></FilterBlock>
    <CatalogBlock :productCategory="productCategory" :products="items" @loadMore="loadMore()"></CatalogBlock>
    <AboutItBlock></AboutItBlock>
    <SubscriptionBlock></SubscriptionBlock>
</template>

<script>
import FilterBlock from "./Blocks/CatalogPage/FilterBlock.vue";
import CatalogBlock from "./Blocks/CatalogPage/CatalogBlock.vue";
import AboutItBlock from "./Blocks/CatalogPage/AboutItBlock.vue";
import SubscriptionBlock from "./Blocks/generalBlocks/SubscriptionBlock.vue";
import { api } from '@/api.js'
import { getProducts, generateAllProducts } from "@/service/getAllProducts"
// import { addProductsForApi } from '@/database-mock'

export default {
    name: "CatalogPage",
    components: {
        FilterBlock,
        CatalogBlock,
        AboutItBlock,
        SubscriptionBlock
    },
    props: {
        productCategory: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            allProducts: [],
            items: [],
            limit: 6,
            offset: 0,
            category: null,
            // addMoreProducts: addProductsForApi,
            // array: [],

            filters: []
        }
    },
    async created() {
        this.category = this.productCategory
    },

    mounted() {
        this.loadMore()
    },

    methods: {
        async loadMore() {
            this.allProducts = await generateAllProducts()
            console.log(this.allProducts.length);

            let filteredProducts = await getProducts(this.getFullFilters())
            this.items = filteredProducts
            this.offset += 6
            this.limit += 6
        },

        filterChangeHandler(event, name) {
            console.log(event, name, 11111)
            // this.filters[name] = event.name
            this.filters = {
                key: name,
                name: event.name,
            }
            console.log(this.filters);
            // console.log(this.allProducts.filter((i) =>
            //     i[`${this.filters.key}`] === this.filters.name
            // ))
            this.items = this.allProducts.filter((i) =>
                i[this.filters.key] === this.filters.name
            )

            this.reset()

            // /* API */
            // //   api.products
            // //     .getProducts(this.getFullFilters())
            // //     .then((res) => {
            // //       this.items = res.products
            // //       this.offset += res.products.length
            // //     })
        },

        // getProducts(filters) {
        //     let mainDommen = 'https://dummyjson.com?'
        //     let filtersKeys = Object.keys(filters)
        //     var query = filtersKeys.map(function (filterKey) {
        //         return filterKey + '=' + filters[filterKey];
        //     });
        //     let fullQueryUrl = mainDommen + query.join('&')
        //     console.log(fullQueryUrl)
        // },

        getFullFilters() {
            let data = {
                limit: this.limit,
                skip: this.offset,
                category: this.category
            }

            data = {
                ...data,
                ... this.filters
            }
            //   console.log(data, 666666)
            return data
        },



        reset() {
            this.limit = 6
            this.offset = 0
        },
    }
}
</script>

<style scoped lang="scss">
section {
    &:first-child {
        margin-top: 6.25rem;
    }
}
</style>