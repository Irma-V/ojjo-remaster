<template>
    <nav class="sidebar w-full min-[375px]:max-w-[20rem] max-[425px]:h-[100rem]">
        <div class="sidebar-content__wrapper block min-[769px]:hidden">
            <div class="sidebar-list py-[5%]">
                <ul class="flex flex-col capitalize" @click="this.$emit('openedPage')">
                    <li class="py-[2%]">
                        <router-link :to="{ name: 'home' }">
                            to counterparties
                        </router-link>
                    </li>
                    <li class="py-[2%]">
                        <router-link :to="{ name: 'home' }">
                             to designers
                        </router-link>
                    </li>
                    <li class="py-[2%]">
                        <router-link :to="{ name: 'contacts' }">
                            Contacts
                        </router-link>
                    </li>
                    <li v-if="!userIsAuth" class="py-[2%]">
                        <router-link :to="{ name: 'login' }">
                            <span>Login / Registration</span>
                        </router-link>
                    </li>
                    <li v-if="userIsAuth" @click.prevent="$emit('logout')">
                        <span class="cursor-pointer">Logout</span>
                    </li>
                </ul>
            </div>
            <hr v-if="userIsAuth">
            <div v-if="userIsAuth" class="sidebar-list py-[5%]" @click="this.$emit('openedPage')">
                <ul class="flex flex-row">
                    <li class="basis-1/6">
                        <router-link :to="{ name: 'user' }">
                            <ion-icon name="person" size="large"></ion-icon>
                        </router-link>
                    </li>
                    <li class="basis-1/6">
                        <router-link :to="{ name: 'favorites' }">
                            <ion-icon name="heart" size="large"></ion-icon>
                        </router-link>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="sidebar-list py-[5%]" @click="this.$emit('openedPage')">
                <ul class="social-media-group flex flex-row justify-between">
                    <li class="basis-1/6">
                        <img src="~@/assets/img/svg/bx_bxl-youtube.svg" class="h-4" alt="">
                    </li>
                    <li class="basis-1/6">
                        <img src="~@/assets/img/svg/bx_bxl-vk.svg" class="h-4" alt="">
                    </li>
                    <li class="basis-1/6">
                        <img src="~@/assets/img/svg/bx_bxl-facebook.svg" class="h-4" alt="">
                    </li>
                    <li class="basis-1/6">
                        <img src="~@/assets/img/svg/bx_bxl-telegram.svg" class="h-4" alt="">
                    </li>
                    <li class="basis-1/6">
                        <img src="~@/assets/img/svg/bx_bxl-e__logo.svg" class="h-4" alt="">
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "SideBar",
    components: {},
    props: {},
    data() {
        return {

        }
    },

    computed: {
        ...mapGetters({
            userIsAuth: 'auth/userIsAuth'
        }),
    }
}
</script>

<style>
.close {
    display: none
}
</style>