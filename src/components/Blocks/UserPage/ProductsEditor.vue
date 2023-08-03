<template>
    <article class="mx-[2%]">
        <TitleBlock title="products editor" description=""></TitleBlock>
        <div class="productsEditor py-[2%] min-[769px]:px-[15%] lg:px-[20%]">
            <div class="options flex flex-row justify-between">
                <ButtonDarkGray @click.prevent=" addProduct()" button-name="add new product" class="add-new basis-[45%]">
                </ButtonDarkGray>

                <ButtonDarkGray @click.prevent="editProduct()" button-name="edit product" class="edit-current basis-[45%]">
                </ButtonDarkGray>
            </div>

            <AddProductForm v-show="add" :products="fetchProducts" @updateProducts="this.$emit('updateProducts')">
            </AddProductForm>
            <EditProductForm v-show="edit" :products="fetchProducts" @updateProducts="this.$emit('updateProducts')">
            </EditProductForm>
        </div>
    </article>
</template>

<script>
import ButtonDarkGray from "../../Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import AddProductForm from "../../Blocks/UserPage/AddProductForm.vue";
import EditProductForm from "../../Blocks/UserPage/EditProductForm.vue";
import TitleBlock from "../generalBlocks/TitleBlock.vue";

export default {
    name: "ProductsEditor",
    components: {
    ButtonDarkGray,
    AddProductForm,
    EditProductForm,
    TitleBlock
},
    props: {
        fetchProducts: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            lastProductsElem: 0,
            LastIdxElem: 0,

            brand: '',
            category: '',
            title: '',
            description: '',
            price: '',

            discountPercentage: 0,
            rating: 0,
            stock: 0,

            thumbnail: '/img/bracelet04_01.e96054a5.png',
            images: [
                "/img/bracelet04_01.e96054a5.png",
                "/img/bracelet04_02.61fc0675.png",
                "/img/bracelet04_03.9c951584.png"
            ],

            add: true,
            edit: false,
        }
    },
    methods: {
        addProduct() {
            this.edit = false
            this.add = true
        },
        editProduct() {
            this.add = false
            this.edit = true
        },
    },
}
</script>
<style scoped lang="scss">
.add-new, .edit-current{
    height: auto;
}
</style>