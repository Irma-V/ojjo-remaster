<template>
    <article>
        <div class="content">
            <div
                class="about-it-block px-[10%] font-sans font-thin tracking-tight text-xs sm:text-sm min-[769px]:text-sm lg:text-base xl:text-xl">
                <div class="about-it__wrapper flex flex-col min-[769px]:flex-row-reverse min-[769px]:justify-between">
                    <div class="about-it-title basis-1/3">
                        <div v-if="services.length"
                            class="about-it-title__wrapper flex flex-row flex-wrap justify-between items-center">
                            <div v-for="service in services" :key="service" class="about-it-title-item p-[2%] basis-2/4">
                                <div class="service-wrapper flex flex-col items-center cursor-pointer" :id="service.id"
                                    @click="selectService(service)">
                                    <img :src="service.svg_url" class="w-[4.375rem] h-[4.375rem]" alt="">
                                    <span class="title-name w-1/2 text-center">{{ service.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="about-it-description basis-3/5">
                        <h1 class="uppercase font-semibold text-base sm:text-xl tracking-widest mb-4">
                            {{ selectedService.title }}</h1>

                        <ShowHidden :showHeight="showHeight" hideAndShowStyle="flex flex-col justify-between"
                            showMoreButtonStyle="uppercase text-base sm:text-xl tracking-widest py-[0.5rem]  border-b-[0.18rem] border-dashed border-black">

                            <template v-slot:mainContent>
                                <p>{{ selectedService.description }}</p>
                            </template>

                            <template v-slot:showMoreButton>
                                Read completely
                            </template>
                        </ShowHidden>
                    </div>

                </div>
            </div>

        </div>
    </article>
</template>
<script>
import ShowHidden from '../generalBlocks/ShowMoreComponents/ShowHidden.vue';
import { services } from '@/database-mock';


export default {
    name: "AboutItBlock",
    components: {
        ShowHidden

    },
    props: {},
    computed: {

    },
    data() {
        return {
            showHeight: 15,
            services: services,
            selectedService: null
        }
    },
    created() {
        this.selectedService = this.services.find(serviceItem => serviceItem.id === serviceItem.id)
    },

    methods: {
        selectService(el) {
            this.selectedService = services.find((serviceItem) => {
                return serviceItem.id === el.id
            })
        }
    },
}
</script>
<style scoped lang="scss">
.about-it-title-item {
    transition: 0.9s;

    &:hover {
        background-color: rgba(110, 164, 146, 0.375);
    }
}
</style>

<!-- 
    <div class="about-it-title-item p-[2%] basis-2/4">
        <div class="flex flex-col items-center">
            <img src="~@/assets/img/svg/designe.svg" class="w-[4.375rem] h-[4.375rem]" alt="">
            <span class="title-name w-1/2 text-center">individual designe</span>
        </div>
    </div>
-->