<template>
    <section>
        <div class="content">
            <div class="product-card-block font-sans font-thin tracking-tight text-xl">
                <div class="product-card__wrapper flex flex-col md:flex-row justify-between">
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
                                        <ButtonDarkGray button-name="buy"></ButtonDarkGray>
                                    </div>
                                    <div class="buttons-item buttons-item basis-1/2">
                                        <ButtonWhite button-name="add to cart"></ButtonWhite>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ButtonDarkGray from '../generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import ButtonWhite from '../generalBlocks/ButtonsStyle/ButtonWhite.vue';
import PhotoGaleryBlock from './PhotoGaleryBlock.vue';
// import { products } from '@/database-mock';
// import { api } from '@/api.js'
import { generateAllProducts } from "../../../service/getAllProducts";


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
        }
    },
    data() {
        return {
            product: {},
        }
    },
    created() {
        this.loadProduct()
    },
    watch: {
        productId: function () {
            this.loadProduct()
        }
    },

    methods: {
        async loadProduct() {
            // const res =  await api.products.getProductById(this.productId);
            // console.log(res);
            // this.product = res;

            let products = await generateAllProducts().then(result => result)
            // console.log(products);
            this.product = products.find(product => product.id == this.productId)
            // console.log(this.product);
        }


    }
}
</script>
<style scoped lang="scss"></style>