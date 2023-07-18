<template>
    <div class="catalog-item font-sans font-thin tracking-tight text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl h-full min-[375px]:h-[13rem] sm:h-full p-4" :id="productId" :class="productCardItemStyle">
        <div class="catalog-item__wrapper flex flex-row min-[375px]:flex-col justify-between items-center w-full h-full">
            <div class="catalog-item-img mb-[5%] w-4/5">
                <img v-if="sliderShowType === sliderShowTypes.SINGLE" :src="productImg_url"
                    class="rounded-lg object-cover w-full h-[5rem] min-[425px]:h-[7rem] sm:h-[7rem] md:h-[10rem] lg:h-60" alt="">
                <!-- h-[5rem] sm:h-[7rem] md:h-[10rem] lg:h-60 -->
                <agile v-if="sliderShowType === sliderShowTypes.SLIDER" :slidesToShow="1" :infinite="false" :centerMode="false" :dots="false">
                    <img v-for="image in galery" :key="image" :src="image" alt=""
                        class="rounded-lg object-cover w-full h-[5rem] min-[425px]:h-[7rem] sm:h-[7rem] md:h-[10rem] lg:h-60">
                </agile>

            </div>
            <div class="catalog-item__description flex flex-col justify-between items-center w-full" @click.stop="this.$router.push(`/product/id=${productId}`)">
                <div class="catalog-item-category mb-[5%] text-center">{{ product }}</div>
                <div class="catalog-item-name font-bold mb-[5%]">{{ productName }}</div>
                <div class="catalog-item-price w-1/2 mb-[5%]">
                    <!-- <router-link :to="{
                        name: 'ProductPage',
                        params: {
                            productId: productId
                        },
                    }"> -->
                        <ButtonDarkGray :button-name="productPrice"></ButtonDarkGray>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonDarkGray from '../generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import { VueAgile } from 'vue-agile'
// enum
const SliderShowTypeEnum = {
    SLIDER: 'slider',
    SINGLE: 'single',
}

export default {
    name: "ProductCardItem",
    components: {
        ButtonDarkGray,
        agile: VueAgile,
    },
    props: {
        productId: {
            type: String,
        },
        productCardItemStyle: {
            type: String,
        },
        productCategory: {
            type: String,
        },
        productImg_url: {
            type: String,
            // default: "./assets/img/catalog/pendants/Rectangle.png",
        },

        product: {
            type: String,
            // default: "подвеска",
        },
        productName: {
            type: String,
            // default: "D&G",
        },
        productPrice: {
            type: String,
            // default: "1 400 $",
        },

        galery: {
            type: Array,
            default: [],
        },
        sliderShowType: {
            type: String,
            default: SliderShowTypeEnum.SLIDER
        }
    },
    data() {
        return {
            sliderShowTypes: SliderShowTypeEnum
        };
    },
}
</script>

<style scoped lang="scss">
// .agile__slides {
    .catalog-item {
        transition: 0.9s;
        &:hover {
            background-color: rgba(110, 164, 146, 0.375);
        }
    }
// }

</style>