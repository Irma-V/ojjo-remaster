<template>
  <section>
    <div class="content">
      <div class="filter-block flex flex-col items-center">
        <div class="filter__wrapper flex flex-row justify-between items-center w-full flex-wrap lg:flex-nowrap">

          <VSelect :options="brands" @select="selectOption($event, 'brand')" selected-option="brands" />
          <VSelect :options="prices" @select="selectOption($event, 'price')" selected-option="price ($)" />
          <VSelect :options="toWhom" @select="selectOption(toWhom)" selected-option="to whom" />
          <VSelect :options="collections" @select="selectOption(collections)" selected-option="collections" />
          <VSelect :options="season" @select="selectOption(season)" selected-option="season" />
          <VSelect :options="theEvent" @select="selectOption(theEvent)" selected-option="the event" />

          <!-- <VSelect :options="options" @select="selectOption(options)" :selected-option="selected" /> -->
          <!-- <div class="filter-item basis-1/6 p-4">
            <div class="filter-item__wrapper border-b-[0.18rem]">
              <select class="capitalize w-full bg-[#F9F9F9]" id="" aria-label="brand" v-model="selected">
                <option value="">brand / price / to whom / collections / season / the event </option>
                <option value="1">rgr</option>
                <option value="2">rhaerhearh</option>
                <option value="3">hlknltnhl</option>
              </select>
            </div>
          </div> -->
        </div>

        <!-- <div class="filter-operations flex flex-row justify-between w-1/3">
          <div class="filter-operations-item basis-1/3">
            <ButtonWithBorder button-name="apply"></ButtonWithBorder>
          </div>
          <div class="filter-operations-item basis-1/3">
            <ButtonWithBorder button-name="reset"></ButtonWithBorder>
          </div>          
        </div> -->
      </div>

      <!-- <div class="result">{{ brands }}</div> -->
    </div>
  </section>
</template>

<script>
import { api } from '@/api.js'
import VSelect from '../generalBlocks/v-select.vue';
import ButtonWithBorder from '../generalBlocks/ButtonsStyle/ButtonWithBorder.vue';


export default {
  name: "FilterBlock",
  components: { VSelect, ButtonWithBorder },
  props: {},
  emits: {},
  data() {
    return {
      // selected: 'select-option template',
      // options: [
      //   { name: 'option 1', value: 1 },
      //   { name: 'option 2', value: 2 },
      //   { name: 'option 3', value: 3 },
      //   { name: 'option 4', value: 4 },
      //   { name: 'option 5', value: 5 },
      // ],

      allProducts: [],
      brands: [],
      prices: [],
      collections: [],
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
    this.allProducts = await api.products.getAllProducts()
    // console.log(this.allProducts);

    // let allBrands = await api.products.getProperties(this.allProducts, 'brand')
    // console.log(allBrands);
    // let brandsNames = this.getUniqueNames(await api.products.getProperties(this.allProducts, 'brand'))
    // this.brands = this.getOptions(brandsNames)
    // console.log(brands);

    this.brands = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'brand')))
    this.prices = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'price')))
    this.collections = this.getOptions(this.getUniqueNames(await api.products.getProperties(this.allProducts, 'category')))
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


  },
};
</script>