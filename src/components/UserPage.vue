<template>
    <Loader v-if="loading || !user"></Loader>
    <section v-else>
        <div class="content">
            <div class="userPage">
                <ion-icon name="person" size="large"></ion-icon>
                This page can visible only users
                <!-- <div class="wrapper flex flex-row flex-wrap justify-between">
                    <Loader v-if="loading || !fetchProducts"></Loader>
                    <ProductCardItem v-else productCardItemStyle=" w-1/3 min-[375px]:w-1/2 sm:w-1/3"
                        v-for="product in fetchProducts" :key="product" :product-id="product.id" :product="product.title"
                        :product-name="product.brand" :product-price="product.price + ' $'" slider-show-type='slider'
                        :galery="product.images" />
                </div> -->

                <form @submit.prevent="submitHundler()" v-if="isAdmin">
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
                            product: {{ error.$message }}</small>
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
                        <input id="description" type="text" placeholder="Information about new product"
                            v-model.trim="description"
                            :class="{ invalid: v$.description.$dirty && v$.description.$invalid }" class="h h-40" />
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
                    <div class="addPr">
                        <ButtonDarkGray button-name="add product" type="submit"></ButtonDarkGray>
                    </div>
                </form>

            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import ButtonDarkGray from "./Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import ProductCardItem from "./Blocks/CatalogPage/ProductCardItem.vue";

import store from "@/store";
import { auth } from "@/main";
// import { generateAllProducts } from "@/service/getAllProducts";

import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

export default {
    name: "UserPage",
    components: {
        Loader,
        ButtonDarkGray,
        ProductCardItem
    },
    data() {
        return {
            loading: true,
            user: null,
            isAdmin: true,
            fetchProducts: null,
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
        }
    },
    // created() {},

    async mounted() {
        auth.onAuthStateChanged(async (user) => {
            await store.dispatch('auth/fetchUser', user);
            console.log('пользователь: ', user || null);
            if (user !== null) {
                this.user = user
                this.loading = false
                if (this.user.email !== 'vermeil_irma@mail.ru') {
                    // console.log(this.user.email);
                    this.isAdmin = false
                }        
            }
        });

        this.fetchProducts = await store.dispatch('products/fetchProducts')
        this.lastProductsElem = this.fetchProducts.at(-1).id
        this.LastIdxElem = Object.keys(this.fetchProducts).length - 1
        // console.log(this.fetchProducts);
        // console.log('Индекс и ИД последнего элемента: ', this.LastIdxElem, ', ', this.lastProductsElem);

    },
    methods: {
        async submitHundler() {
            console.log('submitHundler');

            /* Для записи ранее созданных продуктов в бд */
            // const allProducts = await generateAllProducts()
            // console.log(allProducts);
            // await store.dispatch('products/updateProducts', allProducts)

            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

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

            try {
                await store.dispatch('products/createProduct', { dataset, lastIndex })
            } catch (error) {
                console.log(error);
            }
            this.LastIdxElem = this.LastIdxElem + 1
            this.lastProductsElem = this.lastProductsElem + 1
            console.log('Индекс и ID последнего элемента: ', this.LastIdxElem, ', ', this.lastProductsElem);
        }
    }
}
</script>
<style scoped lang="scss">
// form {
//     .input-field {
//         .invalid {
//             outline: 0.1rem solid red;
//         }
//     }

// }
</style>