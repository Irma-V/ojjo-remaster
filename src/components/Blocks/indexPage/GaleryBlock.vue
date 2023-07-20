<template>
    <section>
        <div class="content">
            <TitleBlock title="We're on social media" description="#ojjo_jewerly"></TitleBlock>
            <div class="start-page-galery">
                <div class="start-page-galery__wrapper grid grid-cols-2 min-[769px]:grid-cols-3 lg:grid-cols-4 gap-0">
                    <div v-for="element in startPageGalery" :key="element"
                        class="start-page-galery-item h-[7rem] sm:h-[10rem]  lg:h-[18.75rem] overflow-hidden" :class="element.itemStyle">
                        <img :src="element.image_url" class="w-full h-wull object-cover" :class="element.imageStyle" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import TitleBlock from '../generalBlocks/TitleBlock.vue';
import { startPageGalery } from '@/database-mock';

export default {
    name: "GaleryBlock",
    components: {
        TitleBlock,
    },
    props: {

    },
    data() {
        return {
            startPageGalery: startPageGalery,
        }
    },

}
</script>
<style scoped lang="scss">
.start-page-galery-item {
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

// для растянутых
@media screen and (min-width: 1024px) {
    .odd-line {
        &:first-child {
            grid-column: 1/3;
        }
    }
    
    .even-line {
        &:last-child {
            grid-column: 3/5;
        }
    }

}
</style>

<!-- 
    <div class="start-page-galery-item h-[18.75rem]">
        <img src="~@/assets/img/startPageGalery/gallery__image_x1_02/03/04/05/06.png" class="w-full h-wull object-cover" alt="">
    </div>
-->