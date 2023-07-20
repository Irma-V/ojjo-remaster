<template>
    <div class="product-card-galery__wrapper flex flex-col justify-between h-[30rem] min-[769px]:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[40rem] mb-[3%] min-[769px]:mb-0">
        <div class="photo-gallery__large-image pb-[2%] basis-4/5 overflow-hidden">
            <img class="large-image__wrapper rounded-sm object-cover w-full h-full" :src="selectedImage" alt="Image">
        </div>

        <ul class="photo-gallery__thumbs  flex flex-row justify-between  basis-1/5" id="thumbs">
            <li v-for="item in imagesUrl" :key="item" @click="selectImage(item)" class="basis-1/3">
                <img :src="item" class="rounded-sm object-cover w-full h-full">
            </li>
        </ul>

    </div>
</template>

<script>
// import { products } from '@/database-mock';

// import { startPageGalery } from '@/database-mock';

export default {
    name: "PhotoGaleryBlock",
    components: {

    },
    props: {
        selectedImage: {
            type: String,
        },
        imagesUrl: {
            type: Array,
            default: [],
        }
    },

    data() {
        return {
            selectedImage: '',
        }
    },
    
    created() {
        this.init()
    },
    methods: {
        selectImage(newlink) {
            this.selectedImage = newlink
        },
        reset() {
            this.selectedImage = ''
        },
        init: function() {
            this.selectedImage = this.imagesUrl[0] ?? this.imagesUrl
        }
    },
    watch: { 
        imagesUrl: function() { 
            this.init()
        }
    }
}
</script>

<style scoped lang="scss">
.product-card-galery__wrapper {
    .photo-gallery__thumbs {

        li {
            list-style: none;
            margin: 0 1rem 0 0;

            &:last-child {
                margin: 0 0 0 0;
            }
        }
    }
}
</style>

<!-- <div class="photo-gallery__large-image flex basis-4/5 pb-[2%]">
                    <img ref="largeImg" class="large-image__wrapper object-cover w-full rounded-sm" id="largeImg"
                        :src="item.productImg_url" alt="Image">
                </div> -->
<!-- <li v-for="i in item.productGalery_url" :key="i" @click="selectImage(i)">
                        <img :src="i" class="rounded-sm">
                    </li> -->