<template>
    <Loader v-if="loading || !user || !fetchProducts"></Loader>
    <section v-else>
        <div class="content">
            <div class="userPage">
                <ion-icon name="person" size="large"></ion-icon>
                This page can visible only users

                <ProductsEditor v-if="info.userRole === 'Admin'" 
                :fetchProducts="fetchProducts"
                @updateProducts="updateProducts" />

            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";

import ProductsEditor from "./Blocks/UserPage/ProductsEditor.vue";


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
        ProductsEditor,
    },
    data() {
        return {
            loading: true,
            user: null,
            fetchProducts: null,
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