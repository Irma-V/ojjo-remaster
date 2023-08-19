<template>
    <nav class="navbar flex flex-row justify-between items-center">
        <div class="header-list-left hidden min-[769px]:block basis-1/4">
            <ul class="flex flex-row justify-between items-center capitalize" @click.stop="this.$emit('openedPage')">
                <li>
                    <router-link :to="{ name: 'home' }">
                        to counterparties
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'home' }">
                        to designers
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'contacts' }">
                        Contacts
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="logo basis-1/3 min-[769px]:basis-auto">
            <router-link :to="{ name: 'home' }">
                <img src="~@/assets/img/logo/OJJO.png" alt="OJJO.png" />
            </router-link>
        </div>
        <div class="header-list-right hidden min-[769px]:block basis-1/4" @click.stop="this.$emit('openedPage')">
            <ul class="flex flex-row justify-between">
                <li>
                    <div class="flex flex-row justify-between items-center">
                        <ion-icon name="search-outline" class="mr-2"></ion-icon>
                        <span> Search </span>
                        <input type="text" class="hidden" />
                    </div>
                </li>
                <li v-if="!userIsAuth">
                    <router-link :to="{ name: 'login' }">
                        <span>Login / Registration</span>
                    </router-link>
                </li>
                <li v-if="userIsAuth && userName !== 'Anonimous'" @click.prevent="$emit('logout')">
                    <span class="cursor-pointer">Logout</span>
                </li>
                <li v-if="userIsAuth">
                    <router-link :to="{ name: 'user' }">
                        <ion-icon name="person"></ion-icon> {{ userName }}
                    </router-link>
                </li>
                <li v-if="userIsAuth">
                    <router-link :to="{ name: 'basket' }">
                        <!-- <ion-icon name="heart"></ion-icon> -->
                        <ion-icon name="cart-sharp"></ion-icon>
                    </router-link>
                </li>
            </ul>
        </div>
        <div @click.stop="$emit('clickOnBurger')" class="menu-burger block min-[769px]:hidden">
            <ion-icon :name="icon" size="large"></ion-icon>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "NavBar",
    components: {},
    props: {
        icon: {
            type: String,
        },
        userName: {
            type: String,
        },
    },
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

<style scoped lang="scss">
.header-list-left{

    ul {
        li {
            text-align: center;
            padding: 0 3%;
        }
    }
}
</style>