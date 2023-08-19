<template>
    <Loader v-if="loading || !user || !fetchProducts"></Loader>
    <section v-else>
        <div class="content">
            <div class="user-page">
                <ProfileInfo></ProfileInfo>
                <ProductsEditor v-if="info.userRole==='Admin'" :fetchProducts="fetchProducts"
                    @updateProducts="updateProducts" />

                <AnonimousForm v-if="info.userRole === 'Anonimous'" />
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import ProductsEditor from "./Blocks/UserPage/ProductsEditor.vue";
import ProfileInfo from "./Blocks/UserPage/ProfileInfo.vue";
import AnonimousForm from "./Blocks/UserPage/AnonimousForm.vue";

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
        ProfileInfo,
        AnonimousForm,
    },
    data() {
        return {
            loading: true,
            user: {},
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
            // console.log('пользователь: ', user || null);
            if (user !== null) {
                this.user = user
                this.loading = false
                console.log(this.info);
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