<template>
    <FirstSlide></FirstSlide>
    <TagsCategoriesBlock></TagsCategoriesBlock>
    <OffersBlock></OffersBlock>
    <NewsBlock></NewsBlock>
    <GaleryBlock></GaleryBlock>
    <SubscriptionBlock></SubscriptionBlock>
    <!-- <TestBlock></TestBlock> -->
    <!-- <ContactsPage></ContactsPage> -->
    <!-- <CatalogPage></CatalogPage>
    <ProductPage></ProductPage> -->
</template>

<script>
import FirstSlide from "./Blocks/indexPage/FirstSlide/FirstSlide.vue";
import TagsCategoriesBlock from "./Blocks/indexPage/TagsCategoriesBlock.vue";
import GaleryBlock from "./Blocks/indexPage/GaleryBlock.vue";
import NewsBlock from "./Blocks/indexPage/NewsBlock.vue";
import OffersBlock from "./Blocks/generalBlocks/OffersBlock.vue";
import SubscriptionBlock from "./Blocks/generalBlocks/SubscriptionBlock.vue";

// import TestBlock from "./TestBlock.vue";
// import ContactsPage from "./ContactsPage.vue";
// import CatalogPage from "./CatalogPage.vue";
// import ProductPage from "./ProductPage.vue";

export default {
    name: "IndexPage",
    components: {
        FirstSlide,
        TagsCategoriesBlock,
        NewsBlock,
        OffersBlock,
        GaleryBlock,
        SubscriptionBlock,
        // TestBlock,
    },

    data() {
        return {

        }
    }
};
</script>

