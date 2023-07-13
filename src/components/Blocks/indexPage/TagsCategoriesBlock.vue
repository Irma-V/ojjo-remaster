<template>
    <section>
        <div class="content">
            <TitleBlock title="True beauty is here!" description="to activities"></TitleBlock>
            <div class="tags-and-categories">
                <div class="tags-and-categories__wrapper">
                    <ul class="tags-wrapper flex flex-row justify-between mb-[7%] flex-wrap lg:flex-nowrap">
                        <li v-for="tag in tags" :key="tag" class="tags-item basis-1/2 md:basis-1/3 xl:basis-[15%] p-[2%]"
                            :id="tag.id">
                            <ButtonWithBorder :is-active="tag.id === selectedTag.id" @click="selectTag(tag)"
                                :button-name="tag.title"></ButtonWithBorder>
                        </li>
                    </ul>

                    <div
                        class="categories-catalog uppercase font-sans font-thin tracking-tight text-xs sm:text-sm md:text-base lg:text-xl text-white">
                        <div class="categories-catalog__wrapper grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                            <div v-for="category in categoriesByTag" :key="category"
                                class="categories-catalog-item w-full h-[5rem] min-[375px]:h-[10rem] md:h-[17.5rem]"
                                :class="category.bgImg">
                                <router-link :to="{
                                    name: 'CatalogPage',
                                    params: {
                                        productCategory: category.title
                                    }
                                }">
                                    <div class="category gray-gradient w-full h-full flex justify-center items-end py-[3%]">
                                        <h1>{{ category.title }}</h1>
                                    </div>
                                </router-link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import ButtonWithBorder from '../generalBlocks/ButtonsStyle/ButtonWithBorder.vue';
import TitleBlock from '../generalBlocks/TitleBlock.vue';
import { tags, categories } from '@/database-mock';

export default {
    name: "TagsCategoriesBlock",
    components: {
        TitleBlock,
        ButtonWithBorder
    },
    props: {
    },
    computed: {
        categoriesByTag() {
            return this.categories.filter(category => category.tag_id.includes(this.selectedTag.id))
        },
    },

    data() {
        return {
            tags: tags,
            categories: categories,
            selectedTag: null,
        }
    },
    created() {
        this.selectedTag = this.tags[0]
    },
    methods: {
        selectTag(tag) {
            this.selectedTag = tag
        },
    }
}
</script>
<style scoped lang="scss">
.categories-catalog {
    .categories-catalog__wrapper {
        .categories-catalog-item {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;

        }

    }
}
</style>

<!-- 
    <li class="tags-item basis-[10%]">
        ButtonWithBorder button-name="marriage, to husband, to wife, to a partner, collections, rarity></ButtonWithBorder>
    </li>
-->

<!--
    <div class="categories-catalog-item w-full h-[17.5rem] bg-rings/bg-earrings"/bg-pendants"/bg-cufflinks"/bg-bracelets"/bg-watch">
    
    </div> 
-->