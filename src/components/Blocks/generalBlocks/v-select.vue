<template>
    <div ref="vSelect" class="min-[320px]:basis-1/2 min-[769px]:basis-1/3 xl:basis-[15%] p-[2%]">
        <div class="v-select relative w-full font-sans font-thin tracking-tight text-base min-[769px]:text-xs lg:text-sm xl:text-base">
            <p class="v-select__title capitalize cursor-pointer p-1 border-solid border-[0.1rem] border-500 flex flex-row justify-between items-center"
                @click="switchVisiable()">
                {{ selected }}
                <ion-icon name="chevron-down-outline"></ion-icon>
            </p>
            <div v-if="isVisiable" class="v-select__options p-1 border-solid border-[0.1rem] border-500 absolute bg-white w-full z-50 h-40 overflow-hidden overflow-y-auto">
                <p v-for="option in options" :key="option" class="v-select__option capitalize cursor-pointer m-0" @click="selectOption(option)">
                    {{ option.name }}
                </p>
            </div>
            <!-- <select v-model="selected">
                    <option v-for="option in options" :key="option">{{ option.name }}</option>
                </select> -->
        </div>
    </div>
</template>
<script>

export default {
    name: "v-Select",
    components: {

    },
    props: {
        options: {
            type: Array,
            default: []
        },
        selectedOption: {
            type: Object,
            // default: 'title'
        }
    },
    emits: {
        select: {
            required: true
        }
    },
    data() {
        return {
            isVisiable: false,
            selected: this.selectedOption
        }
    },
    mounted() {
        document.addEventListener('click', this.clickOutside)
    },
    methods: {
        switchVisiable() {
            this.isVisiable = !this.isVisiable
        },
        clickOutside(event) {
            let el = this.$refs.vSelect
            let target = event.target
            // console.log(el);
            if (el !== target && !el.contains(target)) {
                this.isVisiable = false
            }
        },
        closeSelect() {
            // if (this.isVisible) {
            //     return !this.isVisible
            // }
            // else
            this.isVisiable = false
        },
        selectOption(currentOption) {
            // console.log(currentOption);
            // return currentOption.name
            // this.selected = currentOption.name
            // console.log(this.selected);
            this.$emit('select', currentOption)
            this.selected = currentOption.name
            this.closeSelect()
            return this.selected
        },
    },
    beforeUnmount() {
        document.removeEventListener('click', this.clickOutside)
    },

}
</script>
<style scoped lang="scss">
.v-select__option:hover {
    background: #777777;
}
</style>