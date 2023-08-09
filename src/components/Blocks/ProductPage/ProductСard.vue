<template>
    <article>
        <div class="content">
            <div class="product-card-block font-sans font-thin tracking-tight text-xl">
                <div class="product-card__wrapper flex flex-col min-[769px]:flex-row justify-between">
                    <div class="product-card-galery basis-[45%]">
                        <PhotoGaleryBlock :imagesUrl="product.images"></PhotoGaleryBlock>
                    </div>
                    <div class="product-card-information basis-1/2 border-[0.1rem] p-[1%]">
                        <div
                            class="product-card-information__wrapper border-[0.1rem] p-[5%] h-full flex flex-col justify-between">
                            <!-- BULKA SHWABRA ABRIKOS -->
                            <div class="title basis-[5%] font-semibold text-lg tracking-widest uppercase">
                                {{ product.title }} {{ product.brand }}
                            </div>
                            <div class="additional-inform basis-[5%] text-[#ccc] text-sm w-2/3">
                                <div class="additional-inform__wrapper flex flex-row justify-between">
                                    <!-- <div v-if="product">
                                        {{ product.productId }}
                                    </div> -->
                                    <div class="additional-inform-item">category: {{ product.category }}</div>
                                    <div class="additional-inform-item">brand: {{ product.brand }}</div>
                                </div>
                            </div>
                            <hr>
                            <div class="description basis-[50%] text-sm xl:text-lg flex flex-col justify-around">
                                <p>{{ product.description }}</p>
                                <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque molestias qui maiores
                                    temporibus velit delectus cum magni. Fugit quam, molestias repudiandae assumenda soluta
                                    enim harum similique natus nesciunt maiores dicta? Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Illo quis saepe asperiores dolores ab atque,
                                    exercitationem blanditiis, magnam sunt deleniti porro nihil voluptates neque minima
                                    odio! Exercitationem quam alias veniam.</p>
                            </div>
                            <div class="price basis-[5%] font-semibold text-lg tracking-widest">
                                {{ product.price }}
                            </div>
                            <div class="buttons basis-[5%] w-4/5">
                                <div class="buttons__wrapper flex flex-row justify-between">
                                    <div class="buttons-item buttons-item basis-1/3">
                                        <ButtonDarkGray button-name="buy" @click.prevent="buyNow"></ButtonDarkGray>
                                    </div>
                                    <div class="buttons-item buttons-item basis-1/2">
                                        <ButtonWhite button-name="add to basket" @click.prevent="addToBasket" type="submit">
                                        </ButtonWhite>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import ButtonDarkGray from '../generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import ButtonWhite from '../generalBlocks/ButtonsStyle/ButtonWhite.vue';
import PhotoGaleryBlock from './PhotoGaleryBlock.vue';

import store from "@/store";
import { mapGetters } from "vuex"

export default {
    name: "ProductСard",
    components: {
        PhotoGaleryBlock,
        ButtonDarkGray,
        ButtonWhite
    },
    props: {
        productId: {
            type: String,
            // required: true, 
            default: null,
        },
        userId: {
            type: String,
        },
    },
    data() {
        return {
            product: {},
        }
    },
    created() {
        this.loadProduct()
        console.log(this.baskets);
    },


    computed: {
        ...mapGetters({
            products: 'products/products',
            baskets: 'baskets/baskets',
            info: 'info'
        }),
    },
    async mounted() {
        let baskets = await store.dispatch('baskets/fetchBaskets')
        this.currentBasketUID = Object.keys(baskets).find(item => item === this.userId)
        // console.log('UID корзины: ', this.currentBasketUID)

    },

    watch: {
        productId: function () {
            this.loadProduct()
        }
    },
    methods: {
        async loadProduct() {
            let products = await store.dispatch('products/fetchProducts')
            this.product = products.find(product => product.id == this.productId)
        },

        async addToBasket() {
            console.log('addToBasket');
            let formData = {
                productId: this.productId,
                userId: this.userId || null
            }
            try {
                if (this.userId) {
                    await store.dispatch('baskets/addToBasket', formData)
                    this.$message('Товар добавлен в корзину')
                } else {
                    console.log("Гостю можно предложить зарегаться или создать ячейку для анонимного пользователя");
                    await store.dispatch('auth/createAnonimous')
                    await store.dispatch('baskets/createBaskets')
                    formData = {
                        productId: this.productId,
                        userId: this.userId
                    }
                    await store.dispatch('baskets/addToBasket', formData)
                    this.$message('Товар добавлен в корзину')
                }
            } catch (error) {
                console.log(error);
            }
        },

        buyNow() {
            this.addToBasket()
            if (this.userId) {
                this.$router.push({ name: 'favorites' })
            }
        },
    }
}
</script>
<style scoped lang="scss"></style>

<!-- получение продукта по id (логика убрана из метода loadProduct())
            // const res =  await api.products.getProductById(this.productId);
            // console.log(res);
            // this.product = res;
            // console.log(products);
            // console.log(this.product);
-->