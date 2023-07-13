<template>
    <section>
        <div class="content">
            <div class="flex h-full w-full flex-col mt-[15rem] md:mt-[20rem] min-[900px]:mt-[25rem]">
                <div class="welcome-block__wrapper flex flex-col justify-between items-center text-white xl:h-[9.375rem]">
                    <h1 class="capitalize font-serif text-3xl font-bold tracking-tight text-center">expensive quality,
                        richness
                    </h1>
                    <div class="btn-to-catalog__wrapper w-1/2 min-[555px]:w-2/5 xl:w-1/5 pt-4">
                        <RouterLink :to="{ name: 'CatalogPage' }">
                            <ButtonDarkGray button-name="product catalog"></ButtonDarkGray>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import ButtonDarkGray from '../../generalBlocks/ButtonsStyle/ButtonDarkGray.vue';



export default {
    name: "WelcomeBlock",
    components: {
        ButtonDarkGray,
    },
    props: {

    },
    data() {
        return {
            
        }
    }

    
}
</script>
<style scoped lang="scss"></style>