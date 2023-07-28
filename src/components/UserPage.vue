<template>
    <Loader v-if="loading || !user || !fetchProducts"></Loader>
    <section v-else>
        <div class="content">
            <div class="userPage">
                <ion-icon name="person" size="large"></ion-icon>
                This page can visible only users

                <div  v-if="info.userRole === 'Admin'"
                 class="productsEditor py-[2%] min-[769px]:px-[15%] lg:px-[25%]">
                    <div class="options flex flex-row justify-between">
                        <ButtonDarkGray @click.prevent=" addProduct()" button-name="add new product" class="basis-[45%]">
                        </ButtonDarkGray>

                        <ButtonDarkGray @click.prevent="editProduct()" button-name="edit product" class="basis-[45%]">
                        </ButtonDarkGray>
                    </div>
                    
                    <AddProductForm v-show="add" :products="fetchProducts" @updateProducts="updateProducts">
                    </AddProductForm>
                    <EditProductForm v-show="edit" :products="fetchProducts" @updateProducts="updateProducts">
                    </EditProductForm>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import ButtonDarkGray from "./Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import AddProductForm from "./Blocks/UserPage/AddProductForm.vue";
import EditProductForm from "./Blocks/UserPage/EditProductForm.vue";
import { mapGetters } from "vuex"
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
        AddProductForm,
        EditProductForm,
    },
    data() {
        return {
            loading: true,
            user: null,

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

            add: true,
            edit: false,
        }
    },
    computed: {
        ...mapGetters({
            info: 'info',
            products: 'products/products'
        }),
    },
    async mounted() {
        auth.onAuthStateChanged(async (user) => {
            await store.dispatch('auth/fetchUser', user);
            console.log('пользователь: ', user || null);
            if (user !== null) {
                this.user = user
                this.loading = false
            }
        });

        this.updateProducts()
    },

    methods: {
        async updateProducts() {
            this.fetchProducts = await store.dispatch('products/fetchProducts')
            // console.log(this.fetchProducts);
            return this.fetchProducts
        },
        addProduct() {
            this.edit = false
            this.add = true
        },
        editProduct() {
            this.add = false
            this.edit = true
        },
    },

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