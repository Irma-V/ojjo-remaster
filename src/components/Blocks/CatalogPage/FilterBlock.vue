<template>
    <article>
        <div class="content">
            <div class="filter-block flex flex-col items-center">
                <div class="filter__wrapper flex flex-row justify-between items-center w-full flex-wrap lg:flex-nowrap" >

                    <VSelect :options="brands" @select="selectOption($event, 'brand')" :selected-option="filterTitles[0]" />
                    <VSelect :options="prices" @select="selectOption($event, 'price')" :selected-option="filterTitles[1] + ` ($)`" />
                    <VSelect :options="category" @select="selectOption($event, 'category')" :selected-option="filterTitles[2]" />
                    <VSelect :options="toWhom" @select="selectOption($event, 'toWhomm')" :selected-option="filterTitles[3]" />
                    <VSelect :options="season" @select="selectOption($event, 'season')" :selected-option="filterTitles[4]" />
                    <VSelect :options="theEvent" @select="selectOption($event, 'event')" :selected-option="filterTitles[5]" />
                    
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import { api } from '@/api.js'
import VSelect from '../generalBlocks/v-select.vue';
import ButtonWithBorder from '../generalBlocks/ButtonsStyle/ButtonWithBorder.vue';


export default {
    name: "FilterBlock",
    components: { VSelect, ButtonWithBorder },
    props: {
        products: {
            type: Array,
            required: true
        },
        filterTitles: {
            type: Array,
            required: true
        },
    },
    emits: {},
    data() {
        return {
            allProducts: [],

            brands: [],
            prices: [],
            category: [],
            toWhom: [
                { name: 'to husband', value: 0 },
                { name: 'to wife', value: 0 },
                { name: 'to a partner', value: 0 },
            ],
            season: [
                { name: 'spring', value: 0 },
                { name: 'summer', value: 0 },
                { name: 'autumn', value: 0 },
                { name: 'winter', value: 0 },
            ],
            theEvent: [
                { name: 'wedding', value: 0 },
                { name: 'anniversary', value: 0 },
                { name: 'holiday', value: 0 },
                { name: 'birthday', value: 0 },
            ],
        }
    },
    async created() {
        this.allProducts = this.products

        this.brands = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'brand')))
        this.category = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'category')))
        this.prices = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'price')))
    },

    mounted() {

    },
    methods: {
        getUniqueNames(array) {
            array = [... new Set(array)]
            return array
        },

        selectOption(option, filterName) {
            this.selected = option.name
            this.$emit('select-change', option, filterName)
        },

        getOptions(array) {
            // let result = [{ name: '', value: 0 }]
            let result = []
            let index = 1

            for (let item in array) {
                const element = array[item];
                result.push({ name: element, value: index })
                index++
            }
            return result
        },

        sorting(arr) {
            arr = arr.sort((a, b) => {
                if (a.date > b.date) {
                    return -1
                }
            });
            console.log(arr);
        },

    },
};
</script>