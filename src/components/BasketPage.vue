<template>
    <Loader v-if="loading || !user"></Loader>
    <section v-else>
        <div class="content">
            <TitleBlock title="basket" description="here you can place an order or redirect products to favorites">
            </TitleBlock>

            <div class="users-basket w-full flex flex-col lg:flex-row justify-between">
                <!-- <ion-icon name="heart" size="large"></ion-icon>
                This page can visible only users -->

                <ul :id="userBasket.basketID" v-if="userBasket.basketProducts" class="basket-products w-full basis-7/12">
                    <li :id="product.uniqueId"
                        class="basket-product flex flex-row justify-between items-center p-[2%] rounded-xl cursor-pointer"
                        v-for="product in userBasket.basketProducts" :key="product.uniqueId"
                        @click.prevent="selectItem(product.uniqueId)">
                        <div class="basket-product__image basis-[20%]">
                            <img class="rounded-xl" :src="product.thumbnail" alt="">
                        </div>

                        <div class="basket-product__description basis-[65%] p-[2%] capitalize font-bold">
                            <p>{{ product.title }} "{{ product.brand }}", {{ product.price }}$</p>
                        </div>

                        <div class="basket-product__options basis-[15%] flex flex-col justify-between"
                            :class="{ hidden: isSelected(product.uniqueId) === true }">
                            <ButtonDarkGray button-name="buy"></ButtonDarkGray>
                            <ButtonDarkGray button-name="del" @click="optionDel(product.uniqueId)"></ButtonDarkGray>
                        </div>

                        <div class="selected-item" v-if="isSelected(product.uniqueId) === true">
                            <input class="basis-[2%] outline-none" type="checkbox" :checked="isSelected(product.uniqueId)">
                        </div>
                    </li>
                </ul>
                <div class="basket-details w-full outline outline-1 rounded-xl p-[1%] basis-4/12">
                    <!-- :class="{ 'opacity-0': selected.length === 0 }" -->
                    <div class="basket-details__wrapper p-[3%]">
                        <ul class="details flex flex-col text-xl capitalize">
                            <li>
                                Товары на сумму: {{ fullPrice }}
                            </li>
                            <li>
                                кол-во: {{ selected.length }}
                            </li>
                            <li>
                                сумма: {{ selectedPrice }}
                            </li>
                        </ul>

                        <ul class="basket-options flex flex-col">
                            <li class="basis-1/3 p-[3%] h-auto">
                                <ButtonWithBorder class="" button-name="add to favourites" type="submit">
                                </ButtonWithBorder>
                            </li>
                            <li class="basis-1/3 p-[3%] h-auto">
                                <ButtonWithBorder class="" button-name="delete from basket" type="submit">
                                </ButtonWithBorder>
                            </li>
                            <li class="basis-1/3 p-[3%] h-auto">
                                <ButtonWithBorder class="" button-name="ordering" type="submit"></ButtonWithBorder>
                            </li>
                        </ul>
                    </div>

                </div>
                <p v-if="!userBasket.basketProducts"> There are no products in the basket. В корзине нет товаров. </p>
            </div>

        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import ButtonDarkGray from "./Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import ButtonWithBorder from "./Blocks/generalBlocks/ButtonsStyle/ButtonWithBorder.vue";
import TitleBlock from "./Blocks/generalBlocks/TitleBlock.vue";

import store from "@/store";
import { auth } from "@/main";
import products from "@/store/products";

export default {
    name: "UsersFavoritesPage",
    components: {
        Loader,
        ButtonDarkGray,
        TitleBlock,
        ButtonDarkGray,
        ButtonWithBorder,
    },
    data() {
        return {
            loading: true,
            currentBasketUID: '',
            user: {},
            userBasket: {},
            selected: [],
            fullPrice: 0,
            selectedPrice: 0,
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
        this.userBasket
    },

    methods: {
        isSelected(uniqueId) {
            // console.log(!!this.selected.find((selectedItem) => selectedItem.uniqueId === uniqueId));
            return !!this.selected.find((selectedItem) => selectedItem.uniqueId === uniqueId)
        },

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

                    this.fullPrice = this.getSum(this.userBasket.basketProducts)

                } else {
                    this.userBasket = {
                        basketID: baskets[currentBasketUID].basketId,
                        basketProducts: null,
                    }

                }
            }
            // console.log(this.userBasket);
            return this.userBasket
        },

        async optionDel(uniqueId) {
            console.log('optionDel');
            const uid = this.user.uid
            await store.dispatch('baskets/deleteFromBasket', { uid, uniqueId })
            this.getUserBasket()
            this.$message('Product removed from basket. Товар удалён из корзины.')
        },

        selectItem(uniqueId) {
            const basketProducts = Object.values(this.userBasket.basketProducts)
            const elem = document.getElementById(`${uniqueId}`)
            // console.log(this.isSelected(uniqueId));

            if (this.isSelected(uniqueId)) {
                this.selected = this.selected.filter((selectedItem) => selectedItem.uniqueId !== uniqueId)
                elem.style.backgroundColor = ''
                this.selectedPrice = this.getSub(this.selected)
                return
            }

            for (const item in basketProducts) {
                if (basketProducts[item].uniqueId === uniqueId) {

                    this.selected.push(basketProducts[item])
                    // console.log('Выбраны продукты: ', this.selected, ' Кол-во: ', this.selected.length);
                    elem.style.backgroundColor = 'rgba(110, 164, 146, 0.375)'
                    this.selectedPrice = this.getSum(this.selected)
                }
            }

        },

        getSum(array) {
            // console.log(array);
            let price = 0
            for (let i in array) {
                // console.log(+(array[i].price));
                price += +(array[i].price)
            }
            // console.log(price);
            return price
        },

        getSub(array){
            let price = this.getSum(array)
            return price
        }
    }
}
</script>

<style scoped lang="scss">
.basket-product {
    transition: 0.9s;

    &:hover {
        background-color: rgba(110, 164, 146, 0.375);
    }

    .basket-product__options {
        opacity: 0;
        transition: 1s;

    }

    &:hover .basket-product__options {
        opacity: 1;
    }
}

img {
    max-width: 70%;
}
</style>