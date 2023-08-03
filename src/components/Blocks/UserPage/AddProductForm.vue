<template>
    <Loader v-if="loading || !products"></Loader>

    <form @submit.prevent="submitHundler()" v-else>
        <div class="input-field">
            <label for="category">Category</label>
            <input id="category" type="text" placeholder="Category name in plural" v-model.trim="category"
                :class="{ invalid: v$.category.$dirty && v$.category.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.category.$errors" :key="error.$uid">
                invalid category: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="title">Product</label>
            <input id="title" type="text" placeholder="Name of the jewelry" v-model.trim="title"
                :class="{ invalid: v$.title.$dirty && v$.title.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.title.$errors" :key="error.$uid"> invalid
                product: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="brand">Brand</label>
            <input id="brand" type="text" placeholder="Dolce & Gabanna" v-model.trim="brand"
                :class="{ invalid: v$.brand.$dirty && v$.brand.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.brand.$errors" :key="error.$uid">
                invalid brand: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="description">Description</label>
            <textarea id="description" type="text" placeholder="Information about new product" v-model.trim="description"
                :class="{ invalid: v$.description.$dirty && v$.description.$invalid }" class="h h-40"></textarea>
            <small class="helper-text text-red-600" v-for="error of v$.description.$errors" :key="error.$uid">
                invalid description: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="price">Price</label>
            <input id="price" type="text" placeholder="price" v-model.trim="price"
                :class="{ invalid: v$.price.$dirty && v$.price.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.price.$errors" :key="error.$uid">
                invalid price: {{ error.$message }}
            </small>
        </div>

        <VAccordion>
            <template v-slot:accordionTitle>
                Additionally
            </template>

            <template v-slot:accordionContent>
                <div class="additional-fields px-[1%] flex flex-col justify-between h-[18rem]">
                    <div class="input-field">
                        <label for="discountPercentage">Discount percentage</label>
                        <input id="discountPercentage" type="text" placeholder="discountPercentage"
                            v-model.trim="discountPercentage"
                            :class="{ invalid: v$.discountPercentage.$dirty && v$.discountPercentage.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.discountPercentage.$errors"
                            :key="error.$uid">
                            invalid Discount percentage: {{ error.$message }}
                        </small>
                    </div>
                    <div class="input-field">
                        <label for="rating">rating</label>
                        <input id="rating" type="text" placeholder="rating"
                            v-model.trim="rating"
                            :class="{ invalid: v$.rating.$dirty && v$.rating.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.rating.$errors"
                            :key="error.$uid">
                            invalid rating: {{ error.$message }}
                        </small>
                    </div>
                    <div class="input-field">
                        <label for="stock">stock</label>
                        <input id="stock" type="text" placeholder="discountPercentage"
                            v-model.trim="stock"
                            :class="{ invalid: v$.stock.$dirty && v$.stock.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.stock.$errors"
                            :key="error.$uid">
                            invalid stock: {{ error.$message }}
                        </small>
                    </div>
                </div>
            </template>
        </VAccordion>

        <div class="addProductBtn">
            <ButtonDarkGray button-name="add product" type="submit"></ButtonDarkGray>
        </div>
    </form>
</template>

<script>
import store from "@/store";

import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

import ButtonDarkGray from "../../Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import Loader from "@/components/app/Loader.vue"
import VAccordion from "../../Blocks/generalBlocks/ShowMoreComponents/v-Accordion.vue"
// import { generateAllProducts } from "@/service/getAllProducts";

export default {
    name: "AddProductForm",
    components: {
        ButtonDarkGray,
        VAccordion
    },
    props: {
        products: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            loading: true,
            // fetchProducts: [],
            lastProductsElem: 0,
            LastIdxElem: 0,

            brand: '',
            category: '',
            title: '',
            description: '',
            price: '',

            discountPercentage: 0,
            rating: 0,
            stock: 0,

            thumbnail: '/img/bracelet04_01.e96054a5.png',
            images: [
                "/img/bracelet04_01.e96054a5.png",
                "/img/bracelet04_02.61fc0675.png",
                "/img/bracelet04_03.9c951584.png"
            ],

        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            brand: { required },
            category: { required },
            title: { required },
            description: { required },
            price: { required, numeric },

            /* Additionally: */
            discountPercentage: { required, numeric },
            rating: { required, numeric },
            stock: { required, numeric },
        }
    },
    computed() {
    },
    async mounted() {
        // this.fetchProducts = await store.dispatch('products/fetchProducts')
        // this.lastProductsElem = this.fetchProducts.at(-1).id
        // this.LastIdxElem = Object.keys(this.fetchProducts).length - 1

        // this.fetchProducts = this.products
        this.LastIdxElem = this.products.length - 1
        this.lastProductsElem = this.products[this.LastIdxElem].id
        this.loading = false

        // console.log('Индекс и ИД последнего элемента: ', this.LastIdxElem, ', ', this.lastProductsElem);
        // console.log('Поиск индекса по ID (пример)', this.fetchProducts.findIndex(item => item.id === 115));


    },
    methods: {
        async submitHundler() {
            console.log('submitHundler');

            /* Для записи ранее созданных продуктов в бд */
            // const allProducts = await generateAllProducts()
            // console.log(allProducts);
            // await store.dispatch('products/uploadeProducts', allProducts)

            /* Валидатор */
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            /* запись данных для нового продукта */
            const dataset = {
                id: this.lastProductsElem + 1,
                title: this.title,
                description: this.description,
                price: this.price,
                discountPercentage: this.discountPercentage,
                rating: this.rating,
                stock: this.stock,
                brand: this.brand,
                category: this.category,
                thumbnail: this.thumbnail,
                images: this.images,
            }
            const lastIndex = this.LastIdxElem

            /* отправка запроса на серв */
            try {
                await store.dispatch('products/createProduct', { dataset, lastIndex })
                /* сброс полей */
                this.reset()
                this.v$.$reset()

                /* обновление счетчика */
                this.LastIdxElem = this.LastIdxElem + 1
                this.lastProductsElem = this.lastProductsElem + 1
                console.log('Индекс и ID последнего элемента: ', this.LastIdxElem, ', ', this.lastProductsElem);
                this.$message(`Карточка создана`)
                this.$emit('updateProducts')
            } catch (error) {
                console.log(error);
            }
        },

        reset() {
            this.brand = ''
            this.category = ''
            this.title = ''
            this.description = ''
            this.price = ''

            this.discountPercentage = 0
            this.rating = 0
            this.stock = 0
        },
    }
}
</script>