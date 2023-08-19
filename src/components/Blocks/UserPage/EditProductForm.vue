<template>
    <Loader v-if="loading || !products"></Loader>

    <form v-else>
        <div class="input-field">
            <label class="font-bold">Select product: </label>
            <select id="select" ref="select" v-model="current">
                <option v-for="item in products" :key="item.id" :value="item.id">
                    {{ item.title }} {{ item.brand }}, {{ item.price }} $
                </option>
            </select>
        </div>

        <div class="input-field">
            <label for="category">Category</label>
            <input id="category" type="text" placeholder="Category name in plural" v-model.trim="category"
                :class="{ invalid: v$.category.$dirty && v$.category.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.category.$errors" :key="error.$uid">
                invalid category: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="title">Product</label>
            <input id="title" type="text" placeholder="Name of the jewelry" v-model.trim="title"
                :class="{ invalid: v$.title.$dirty && v$.title.$invalid }" />


            <small class="helper-text text-red-600" v-for="error of v$.title.$errors" :key="error.$uid">
                invalid product: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="brand">Brand</label>
            <input id="brand" type="text" placeholder="Dolce & Gabanna" v-model.trim="brand"
                :class="{ invalid: v$.brand.$dirty && v$.brand.$invalid }" />
            <small class="helper-text text-red-600" v-for="error of v$.brand.$errors" :key="error.$uid">
                invalid brand: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="description">Description</label>
            <textarea id="description" type="text" placeholder="Information about new product" v-model.trim="description"
                :class="{ invalid: v$.description.$dirty && v$.description.$invalid }" class="h h-40"> </textarea>
            <small class="helper-text text-red-600" v-for="error of v$.description.$errors" :key="error.$uid">
                invalid description: {{ error.$message }}
            </small>
        </div>
        <div class="input-field">
            <label for="price">Price</label>
            <input id="price" type="text" placeholder="price" v-model.trim="price"
                :class="{ invalid: v$.price.$dirty && v$.price.$invalid }"/>
            <small class="helper-text text-red-600" v-for="error of v$.price.$errors" :key="error.$uid">
                invalid price: {{ error.$message }}
            </small>
        </div>

        <VAccordion>
            <template v-slot:accordionTitle>
                Additionally
            </template>

            <template v-slot:accordionContent>
                <div class="additional-fields px-[1%] flex flex-col justify-between h-[18rem]">
                    <div class="input-field">
                        <label for="discountPercentage">Discount percentage</label>
                        <input id="discountPercentage" type="text" placeholder="discountPercentage"
                            v-model.trim="discountPercentage"
                            :class="{ invalid: v$.discountPercentage.$dirty && v$.discountPercentage.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.discountPercentage.$errors"
                            :key="error.$uid">
                            invalid Discount percentage: {{ error.$message }}
                        </small>
                    </div>
                    <div class="input-field">
                        <label for="rating">rating</label>
                        <input id="rating" type="text" placeholder="rating" v-model.trim="rating"
                            :class="{ invalid: v$.rating.$dirty && v$.rating.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.rating.$errors" :key="error.$uid">
                            invalid rating: {{ error.$message }}
                        </small>
                    </div>
                    <div class="input-field">
                        <label for="stock">stock</label>
                        <input id="stock" type="text" placeholder="discountPercentage" v-model.trim="stock"
                            :class="{ invalid: v$.stock.$dirty && v$.stock.$invalid }" />
                        <small class="helper-text text-red-600" v-for="error of v$.stock.$errors" :key="error.$uid">
                            invalid stock: {{ error.$message }}
                        </small>
                    </div>                    
                </div>
            </template>
        </VAccordion>

        <div class="options flex flex-row justify-between">
            <div class="editProductBtn basis-[45%]">
                <ButtonDarkGray button-name="edit product" type="submit" @click.prevent="optionEdit()"></ButtonDarkGray>
            </div>
            <div class="editProductBtn basis-[45%]">
                <ButtonDarkGray button-name="delete product" type="submit" @click.prevent="optionDel()"></ButtonDarkGray>
            </div>
        </div>
    </form>
</template>

<script>
import store from "@/store";

import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'

import ButtonDarkGray from "../../Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import Loader from "@/components/app/Loader.vue"
import VAccordion from "../../Blocks/generalBlocks/ShowMoreComponents/v-Accordion.vue"
// import { generateAllProducts } from "@/service/getAllProducts";

export default {
    name: "EditProductForm",
    components: {
        ButtonDarkGray,
        VAccordion
    },
    props: {
        products: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            loading: true,
            // fetchProducts: [],

            id: null,
            brand: '',
            category: '',
            title: '',
            description: '',
            price: '',

            // discountPercentage: 0,
            // rating: 0,
            // stock: 0,

            // thumbnail: '/img/bracelet04_01.e96054a5.png',
            // images: [
            //     "/img/bracelet04_01.e96054a5.png",
            //     "/img/bracelet04_02.61fc0675.png",
            //     "/img/bracelet04_03.9c951584.png"
            // ],

            select: null,
            current: null,

        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            brand: { required },
            category: { required },
            title: { required },
            description: { required },
            price: { required, numeric },

            /* Additionally: */
            discountPercentage: { required, numeric },
            rating: { required, numeric },
            stock: { required, numeric },
        }
    },
    created() {
        this.current = this.products[0].id
        this.id = this.products[0].id
    },
    async mounted() {
        // this.fetchProducts = await store.dispatch('products/fetchProducts')
        M.updateTextFields()
        this.select = M.FormSelect.init(this.$refs.select)
        this.loading = false
    },
    methods: {
        async optionEdit() {
            console.log('optionEdit');

            /* Валидатор */
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            /* запись новых данных */
            const dataset = {
                id: this.id,
                title: this.title,
                description: this.description,
                price: this.price,
                discountPercentage: this.discountPercentage,
                rating: this.rating,
                stock: this.stock,
                brand: this.brand,
                category: this.category,
                
                // thumbnail: this.thumbnail,
                // images: this.images,
            }
            let idx = this.products.findIndex(item => item.id === this.id)
            console.log(dataset, idx);
            try {
                await store.dispatch('products/updateProduct', { dataset, idx })
                this.reset()
                this.$message(`Product Card updated. Карточка обновлена.`)
                this.$emit('updateProducts')
            } catch (error) {
                console.log(error);
            }
        },

        async optionDel() {
            console.log('optionDel');

            /* Валидатор */
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            let idx = this.products.findIndex(item => item.id === this.id)
            if (idx > 30) {
                try {
                    await store.dispatch('products/deleteProduct', idx)
                    this.reset()
                    this.$message(`Product Card removed. Карточка удалена.`)
                    this.$emit('updateProducts')
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Данную карточку нельзя удалить");
                this.$message(`[Access Denied]: This card cannot be deleted! [Отказано в доступе]: Данную карточку нельзя удалить!`)
            }
        },

        reset() {
            this.current = this.products[0].id
            this.id = this.products[0].id
        },

    },
    watch: {
        current(value) {
            // console.log(value);
            // console.log(selectedElem.id);

            const selectedElem = this.products.find(item => item.id === value)
            this.id = selectedElem.id
            this.brand = selectedElem.brand
            this.category = selectedElem.category
            this.title = selectedElem.title
            this.description = selectedElem.description
            this.price = selectedElem.price

            /* Additionally: */
            this.discountPercentage = selectedElem.discountPercentage
            this.rating = selectedElem.rating
            this.stock = selectedElem.stock
        }
    },
}
</script>