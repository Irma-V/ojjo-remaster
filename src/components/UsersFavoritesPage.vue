<template>
    <Loader v-if="loading || !user"></Loader>
    <section v-else>
        <div class="content">
            <div class="userPage">
                <!-- <ion-icon name="heart" size="large"></ion-icon>
                This page can visible only users -->

                <ul :id="userBasket.basketID" v-if="userBasket.basketProducts" class="basket-products">
                    <li :id="product.uniqueId" class="basket-product flex flex-row justify-between items-center py-[2%]"
                        v-for="product in userBasket.basketProducts" :key="product.uniqueId">
                        <div class="basket-product__image basis-[20%]">
                            <img :src="product.thumbnail" alt="">
                        </div>

                        <div class="basket-product__description basis-[65%] p-[2%] capitalize font-bold">
                            <p>{{ product.title }} "{{ product.brand }}", {{ product.price }}$</p>
                        </div>

                        <div class="basket-product__options basis-[15%] flex flex-col justify-between">
                            <ButtonDarkGray button-name="buy"></ButtonDarkGray>
                            <ButtonDarkGray button-name="del" @click="optionDel(product.uniqueId)"></ButtonDarkGray>
                        </div>

                    </li>
                </ul>

                <p v-else> В корзине нет товаров</p>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import ButtonDarkGray from "./Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";

import store from "@/store";
import { auth } from "@/main";

export default {
    name: "UsersFavoritesPage",
    components: {
        Loader,
        ButtonDarkGray
    },
    data() {
        return {
            loading: true,
            currentBasketUID: '',
            user: {},
            userBasket: {},
        }
    },
    async mounted() {
        auth.onAuthStateChanged(async (user) => {
            await store.dispatch('auth/fetchUser', user);
            if (user !== null) {
                this.user = user
                this.loading = false

                // console.log(this.user);
                this.getUserBasket()
            } else {
                return
            }
        });
    },

    computed() {
        this.getUserBasket()
    },

    methods: {

        async getUserBasket() {
            const products = await store.dispatch('products/fetchProducts')
            const baskets = await store.dispatch('baskets/fetchBaskets')
            const currentBasketUID = Object.keys(baskets).find(item => item === this.user.uid)
            // console.log('UID корзины: ', currentBasketUID)
            // console.log('UID пользователя', this.user.uid);

            if (currentBasketUID === this.user.uid) {
                let userBasketProducts = []
                // console.log(baskets[currentBasketUID].products);

                if (baskets[currentBasketUID].products) {
                    let basketProducts = Object.values(baskets[currentBasketUID].products)

                    for (let elem in products) {
                        for (let i in basketProducts) {
                            if (products[elem].id == basketProducts[i]) {
                                // console.log(baskets[currentBasketUID].products, 66666);

                                let obj = baskets[currentBasketUID].products
                                let targetElem = products[elem]
                                targetElem.uniqueId = Object.keys(obj).find(key => obj[key] == targetElem.id)

                                userBasketProducts.push(targetElem)
                            }
                        }
                    }

                    this.userBasket = {
                        basketID: baskets[currentBasketUID].basketId,
                        basketProducts: userBasketProducts,
                    }
                } else {
                    this.userBasket = {
                        basketID: baskets[currentBasketUID].basketId,
                        basketProducts: null,
                    }

                }
            }
            console.log(this.userBasket);
            return this.userBasket
        },

        async optionDel(uniqueId) {
            console.log('optionDel');
            const uid = this.user.uid
            await store.dispatch('baskets/deleteFromBasket', { uid, uniqueId })
            this.getUserBasket()
            this.$message('Товар удалён из корзины')
        }
    }
}
</script>