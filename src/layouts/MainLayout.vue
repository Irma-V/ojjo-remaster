<template>
    <div>
        <VHeader :isOpen="menuState.isOpen" :iconName="menuState.iconName" @runMenuSwitcher="runMenuSwitcher"></VHeader>
        <div class="container min-h-full max-w-[120rem] flex flex-col" @click="closeMenu">
            <main class="min-h-full flex flex-col">
                <router-view />
            </main>
            <FooterBlock></FooterBlock>
        </div>
    </div>
</template>

<script>
import FooterBlock from "@/components/v-Footer.vue";
import VHeader from "@/components/v-Header.vue";
import messages from '@/utils/messages'

import store from '@/store';    
import { mapGetters } from "vuex";
import { generateAllProducts } from "@/service/getAllProducts";

export default {
    name: "MainLayout",
    components: {
        FooterBlock,
        VHeader,
    },
    props: {},
    data() {
        return {
            menuState: {
                isOpen: false,
                iconName: 'menu'
            },
        }
    },

    created() {
        if (this.runMenuSwitcher) {
            window.addEventListener('resize', () => {
                this.width = window.innerWidth
                if (this.width >= 768) {
                    // console.log('close menu');
                    this.closeMenu();
                }

            });
        }

    },
    
    async mounted() {        
        const queryProducts = await store.dispatch('products/fetchProducts')
        const firebaseProducts = Object.values(queryProducts)

        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }        
        if (this.infoIsEmpty) {
            await store.dispatch('fetchInfo')
        }
        
        if (this.basketsIsEmpty) {
            // await store.dispatch('baskets/createBaskets')
            await store.dispatch('baskets/fetchBaskets')
        }

        if (firebaseProducts.length <= 0) {
            const allProducts = await generateAllProducts()
            // console.log(allProducts);
            await store.dispatch('products/uploadeProducts', allProducts)
        }
    },
    computed: {
        ...mapGetters({
            infoIsEmpty: 'infoIsEmpty',
            basketsIsEmpty: 'baskets/basketsIsEmpty',
            productsIsEmpty: 'products/productsIsEmpty'
        }),
        error() {
            return store.getters.error
        }
    },
    methods: {
        closeMenu() {
            if (this.menuState.isOpen === false) {
                return
            }
            // console.log('надо закрыть меню');
            this.isOpen = false
            this.menuState = {
                isOpen: this.isOpen,
                iconName: this.isOpen === true ? 'close' : 'menu'
            }
            // console.log(this.menuState);
            return this.menuState
        },

        runMenuSwitcher() {
            // console.log('runMenuSwitcher');
            this.isOpen = !this.isOpen
            this.menuState = {
                isOpen: this.isOpen,
                iconName: this.isOpen === true ? 'close' : 'menu'
            }
            return this.menuState
        },
    },
    watch: {
        error(fbError) {
            // console.log(fbError); /* содержимое ошибки попадает из ветки catch каждого метода, вызываемого из store в компонентах vue */
            this.$error(messages[fbError])
        }
    },
}
</script>