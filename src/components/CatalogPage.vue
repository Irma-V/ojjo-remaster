<template>
    <div id="fltr" v-if="!category">
        <FilterBlock @select-change="filterChangeHandler" />
        <section>
            <div class="content">
                <div class="info w-full flex flex-row flex-wrap justify-around items-center">
                    <p v-if="filters.length"> найдено товаров: {{ filteredCount }}</p>
                    <div class="resetBtn basis-full min-[270px]:basis-1/2 sm:basis-1/3 min-[769px]:basis-1/5">
                        <ButtonDarkGray button-name="Reset Filters" @click.prevent="reset" />
                    </div>
                </div>
            </div>
        </section>
    </div>
    <section v-else>
        <div class="content">
            <TitleBlock :title="category" description="Category:"></TitleBlock>
            <div v-if="items.length" class="info w-full flex flex-row flex-wrap justify-around items-center">
                <div class="homeBtn basis-full min-[270px]:basis-1/2 sm:basis-1/3 min-[769px]:basis-1/5">
                    <!-- вернуться на шаг назад -->
                    <ButtonDarkGray button-name="come back" @click.prevent="this.$router.go(-1)" />
                    <!-- Вернуться на стартовую <ButtonDarkGray button-name="Homeback" @click.prevent="this.$router.push('/')" /> -->
                </div>
            </div>
            <p v-else class="text-center">Товары по данной категории отстутствуют</p>
        </div>
    </section>
    {{ count }}
    <CatalogBlock v-if="items.length" :productCategory="productCategory" :products="items" :total="allProducts.length"
        :filteredCount="filteredCount" :lim="this.step" @loadMore="loadMore()" />
    <AboutItBlock v-if="items.length" />
    <SubscriptionBlock />
</template>

<script>
import TitleBlock from "@/components/Blocks/generalBlocks/TitleBlock.vue";
import FilterBlock from "./Blocks/CatalogPage/FilterBlock.vue";
import CatalogBlock from "./Blocks/CatalogPage/CatalogBlock.vue";
import AboutItBlock from "./Blocks/CatalogPage/AboutItBlock.vue";
import SubscriptionBlock from "./Blocks/generalBlocks/SubscriptionBlock.vue";
import { getProducts, generateAllProducts } from "@/service/getAllProducts";
import ButtonDarkGray from "./Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
// import { addProductsForApi } from '@/database-mock'
// import { api } from '@/api.js'

export default {
    name: "CatalogPage",
    components: {
        TitleBlock,
        FilterBlock,
        CatalogBlock,
        AboutItBlock,
        SubscriptionBlock,
        ButtonDarkGray
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
            step: 6,
            limit: 6,
            offset: 0,
            category: null,
            filters: [],
            filteredProducts: [],
            filteredCount: 0
        }
    },
    async created() {
        this.category = this.productCategory
        console.log('Категория ', this.category || 'отсутствует');
        // this.limit = this.step
        this.allProducts = await generateAllProducts()

    },

    mounted() {
        this.loadMore()
    },

    methods: {
        async loadMore() {
            let filteredProducts = await getProducts(this.getFullFilters())
            this.items = filteredProducts.result
            this.filteredCount = filteredProducts.count
            this.limit += this.step
            this.offset += this.step
        },

        async filterChangeHandler(event, name) {
            // console.log('содержимое event и name: ',event, name)

            /* Очищение каталога */
            this.items = []


            /* Наполнение фильтра */
            this.filters.push({
                key: name,
                value: event.name,
            })
            for (let i in this.filters) {
                const el = this.filters[i];
                const lastEl = this.filters[this.filters.length - 1]

                /* Удаление элемента в фильтрах, совпадающего по ключу*/
                if ((this.filters.length !== 1) && (el !== lastEl) && (el.key === lastEl.key)) {
                    delete this.filters[i]
                }
                // console.log('сгенерированный фильтр: ', this.filters);
            }

            /* Получение обновленного каталога */
            this.limit = this.step
            this.offset = 0
            this.loadMore()
            // let filteredProducts = await getProducts(this.getFullFilters())
            // this.filteredCount = filteredProducts.count
            // this.items = filteredProducts.result

            // this.limit += this.step
            // this.offset += this.step
        },

        getFullFilters() {
            let data = {
                limit: this.limit,
                skip: this.offset,
                category: this.category
            }
            data = {
                ...data,
                moreFilters: this.filters
            }
            // console.log(data)
            return data
        },

        reset() {
            this.filters = []
            this.limit = this.step
            this.offset = 0
            this.loadMore()
            // console.log('сброшенные данные: ', this.items, this.filters);
        },
    }
}
</script>

<style scoped lang="scss">
section {
    &:first-child {
        margin-top: 7.25rem;
    }
}
</style>


<!--  /* Удаление элемента в фильтрах, совпадающего по ключу*/
    // if (this.filters.length === 1) {
                //     console.log('ничего удалять не надо это 1 элемент. Выходим');
                //     return
                // } else {
                //     if (el.key !== lastEl.key) {
                //         console.log('элемент удалять не надо');
                //     } else {
                //         if (el === lastEl) {
                //         console.log('элемент удалять не надо');                            
                //         } else {
                //             console.log('элемент i надо удалить');
                //             delete this.filters[i]
                //         }
                //     }
                // }
 -->

<!--  /* Пример генерирования ссылки для получения продуктов, отфильтрованных по запрашиваемым ключам у объекта filters */
        // getProducts(filters) {
        //     let mainDomain = 'https://.com?'
        //     let filtersKeys = Object.keys(filters)
        //     var query = filtersKeys.map(function (filterKey) {
        //         return filterKey + '=' + filters[filterKey];
        //     });
        //     let fullQueryUrl = mainDomain + query.join('&')
        //     console.log(fullQueryUrl)
        // },
 -->
 
 <!-- /* фильтрация товаров (логика перенесена из метода filterChangeHandler() в метод getProducts getAllProducts.js) */
            // this.items = this.allProducts.filter((elem) => {
            //     let isValid = true
            //     for (let i in this.filters) {
            //         // console.log(this.filters[i]);
            //         // console.log(elem[ this.filters[i].key], this.filters[i].name, 11111);
            //         // console.log(this.filters[i].name);
            //         if (elem[this.filters[i].key] === this.filters[i].value) {
            //             continue
            //         }
            //         isValid = false
            //         break
            //     }
            //     return isValid
            // })
  -->

<!-- /* Получение обновленного каталога посредством API через подкл-е к https://dummyjson.com (логика отключена и убрана из  filterChangeHandler)*/
            //   api.products.getProducts(this.getFullFilters()).then((res) => {
            //       this.items = res.products
            //       this.offset += res.products.length
            //     }) 


 -->