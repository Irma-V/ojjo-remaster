<template>
    <section>
        <div class="content">
            <TitleBlock title="The best tips for choosing expensive gifts" description="Helpful News"></TitleBlock>
            <div class="news-block font-thin text-xl text-white">
                <ul
                    class="news-block__wrapper grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center mb-[5%]">
                    <li v-for="article in newsArticles" :key="article" class="news-article w-full h-[10rem] sm:h-[10rem] md:h-[15rem] lg:h-[23.125rem]"
                        :class="article.bgImg" :id="article.id">
                        <div class="gray-gradient w-full h-full flex justify-center items-end py-[5%]">
                            <h1 class="cursor-pointer w-1/2 font-sans font-thin tracking-tight text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">{{ article.text }}</h1>
                        </div>
                    </li>
                </ul>
                <div class="btn w-full md:w-1/4 m-auto">
                    <ButtonDarkGray button-name="read our blog"></ButtonDarkGray>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import ButtonDarkGray from '../generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import TitleBlock from '../generalBlocks/TitleBlock.vue';
import { newsArticles } from '@/database-mock';


export default {
    name: "NewsBlock",
    components: {
        TitleBlock,
        ButtonDarkGray
    },
    props: {

    },
    data() {
        return {
            newsArticles: newsArticles,
        }
    }
}
</script>
<style scoped lang="scss">
// section {
// content {
.news-block {
    .news-block__wrapper {
        .news-article {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

    @media screen and (max-width: 640px) and (min-width: 0px) {
        .news-block__wrapper.grid {
            li:nth-child(3n+3) {
                grid-column: 1/3;
            }
    
        }
    }
}

// }
// }</style>