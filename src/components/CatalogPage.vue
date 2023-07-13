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
import { getProducts } from "../service/getAllProducts"
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
      items: [],
      limit: 6,
      offset: 0,
      category: null,
      // addMoreProducts: addProductsForApi,
      // array: [],

      filters: {} 
    }
  },
  async created() {
    this.category = this.productCategory
    // let allProducts = await api.products.getAllProducts()
    // console.log(allProducts);
    /* 
    // // this.getAllBrands(allProducts)
    // console.log(this.getAllBrands(allProducts));
    // let brands = this.getAllBrands(allProducts)
    // console.log(this.getUniqueNames(brands));
    */

    // let brands = await api.products.getProperties(allProducts, 'brand')
    // console.log(brands);
    // let uniqueBrands = this.getUniqueNames(brands)
    // console.log(uniqueBrands);
  },

  mounted() {
    this.loadMore()
  },

  methods: {
    /* // Функция loadMore для получения данных из api 
    loadMore() {
       let apiProducts = [],
         addMoreProducts = this.addMoreProducts
       if (this.productCategory === null) {
         api.products
           .getProducts(this.getFullFilters())
           .then((res) => {
             apiProducts.push(...res.products)
             this.offset += res.products.length
             console.log(apiProducts, addMoreProducts);
             this.items = [...apiProducts, ...addMoreProducts]
             console.log(this.items);
           })
       }

       if (this.productCategory) {
         api.products.getSearchProducts(`${this.productCategory}`).then((res) => {

           this.items.push(...res.products)
           this.offset += res.products.length
         })
       }
     },
    */

    /* // Функция loadMore для получения данных из api и database-mock
    loadMore() {
      if (this.productCategory === null) {
        api.products
          .getProducts(this.getFullFilters())
          .then((res) => {
            this.items.push(...res.products)
            this.offset += res.products.length
          })
      }

      if (this.productCategory) {
        // console.log(this.productCategory);
        let moreProducts = this.addMoreProducts.filter(product => product.category === this.productCategory)
        api.products.getSearchProducts(`${this.productCategory}`).then((res) => {

          this.items.push(...res.products)
          this.offset += res.products.length
          if (this.items.length < 6) {
            this.items.push(...moreProducts)
          }
          if (this.items.length === 0) {
            // console.log('нет товаров');
            this.items.push(...moreProducts)
          }
        })
      }

    },
    */

    async loadMore() {
      let filteredProducts = await getProducts(this.getFullFilters())
      this.items = filteredProducts
      this.offset += 6
      this.limit += 6
    },

    filterChangeHandler(event, name) {
      this.filters[name] = event.name

      this.reset()

      api.products
        .getProducts(this.getFullFilters())
        .then((res) => {
          this.items = res.products
          this.offset += res.products.length
        })

    },

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
      // console.log(data, 666666)
      return data
    },



    reset() {
      this.limit = 6
      this.offset = 0
    },

    // getAllProducts() {
    //   let data = {
    //     limit: 100
    //   }
    //   return api.products.getProducts(data).then((result) => {
    //     // let array =[]
    //     this.array.push(...result.products)
    //     return this.array

    //   })
    // },

    // getAllBrands(arr) {
    //   let brand = null
    //   let brands = []
    //   for (const item in arr) {
    //     brand = arr[item].brand;
    //     brands.push(brand)
    //   }
    //   // console.log([... new Set(brands)]);
    //   // brands = [... new Set(brands)]
    //   return brands;
    // },


    // getUniqueNames(arr) {
    //   arr = [... new Set(arr)]
    //   return arr
    // },


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