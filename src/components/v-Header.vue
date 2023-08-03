<template>
    <header class="w-full fixed bg-[#333333] min-[425px]:min-h-min">
        <div class="header-content m-auto max-w-[120rem] text-white text-sm">
            <div
                class="header-content__wrapper m-auto w-[95%] min-[769px]:w-[95%] lg:w-[90%] xl:w-4/5 flex flex-col justify-between py-[2%] min-[769px]:py-[1%]">
                <NavBar :icon="iconName" @clickOnBurger="this.$emit('runMenuSwitcher')"
                    @openedPage="this.$emit('runMenuSwitcher')" @logout="logout" :userName="userName" />

                <SideBar :class="{ close: !isOpen }" @logout="logout" @openedPage="this.$emit('runMenuSwitcher')"
                    :userName="userName" />
            </div>
        </div>
    </header>
</template>

<script>
// import { api } from '@/api';
import { auth } from '@/main'
import store from '@/store'
import NavBar from "@/components/app/NavBar.vue";
import SideBar from "@/components/app/SideBar.vue";

export default {
    name: "VHeader",
    components: {
        NavBar,
        SideBar,
    },
    props: {
        isOpen: {},
        iconName: {},
    },
    data() {
        return {
            userName: ''
        }
    },
    mounted() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await store.dispatch('auth/fetchUser', user);
                this.userName = user.displayName
            }
        });
    },
    methods: {
        async logout() {
            // console.log('logout');
            await store.dispatch('auth/logOut')
            this.$router.push('/login?message=logout')
            this.userName = ''
            store.commit('clearInfo')
        },
    }
}
</script>

<style scoped lang="scss">
header {
    z-index: 9999;

    .header-content {
        .header-wrapper {

            .header-list {
                flex-basis: 30%;
                align-self: center;

                ul {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;

                    li {
                        cursor: pointer;
                    }
                }
            }
        }

    }
}
</style>


<!-- /* Метод runMenuSwitcher перенесён в MainLayout */ 

    data() {
    //     return {
    //         menuState: {
    //             isOpen: false,
    //             iconName: 'menu'
    //         },
    //     }
    // },

// runMenuSwitcher() {
        //     // console.log('runMenuSwitcher');
        //     this.isOpen = !this.isOpen            
        //     this.menuState = {
        //         isOpen: this.isOpen,
        //         iconName: this.isOpen === true ? 'close' : 'menu'
        //     }
        //     console.log(this.menuState.isOpen);

        //     return this.menuState
        // },
-->

<!-- <header class="w-full fixed bg-[#333333] min-[425px]:min-h-min">
        <div class="header-content m-auto max-w-[120rem] text-white text-sm">
            <div class="header-wrapper m-auto w-[95%] min-[769px]:w-[95%] lg:w-[90%] xl:w-4/5 flex flex-col justify-between py-6">

                <nav class="navbar flex flex-row justify-between items-center">
                    <div class="header-list hidden min-[769px]:block">
                        <ul>
                            <li>to counterparties</li>
                            <li> to designers</li>
                            <li>contacts</li>
                        </ul>
                    </div>
                    <div class="logo">
                        <router-link :to="{ name: 'home' }">
                            <img src="~@/assets/img/logo/OJJO.png" alt="OJJO.png" />
                        </router-link>
                    </div>
                    <div class="header-list hidden min-[769px]:block">
                        <ul>
                            <li>
                                <div class="flex flex-row justify-between items-center">
                                    <ion-icon name="search-outline" class="mr-2"></ion-icon>
                                    <span> Search </span>
                                    <input type="text" class="hidden" />
                                </div>
                            </li>
                            <li v-if="!isAuth">
                                <router-link :to="{ name: 'login' }">
                                    <span>Login / Registration</span>
                                </router-link>
                            </li>
                            <li v-if="isAuth">
                                <span @click="logout()">Logout</span>
                            </li>
                            <li v-if="isAuth">
                                <router-link :to="{ name: 'user' }">
                                    <ion-icon name="person"></ion-icon>
                                </router-link>
                            </li>
                            <li v-if="isAuth">
                                <router-link :to="{ name: 'favorites' }">
                                    <ion-icon name="heart"></ion-icon>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div ref="menu" @click="runMenuSwitcher()" class="menu-burger block min-[769px]:hidden">
                        <ion-icon name="menu" size="large"></ion-icon>
                    </div>
                </nav>
                
                <nav v-if="isMenuOpen"
                    class="sidebar w-full min-[375px]:max-w-[20rem] max-[425px]:h-[100rem]">
                    <div class="sidebar-content__wrapper block min-[769px]:hidden">
                        <div class="sidebar-list py-[5%]">
                            <ul class="flex flex-col">
                                <li class="py-[2%]">
                                    <span> to counterparties</span>
                                </li>
                                <li class="py-[2%]">
                                    <span> to designers</span>
                                </li>
                                <li class="py-[2%]">
                                    <span>contacts</span>
                                </li>
                                <li v-if="!isAuth" class="py-[2%]">
                                    <router-link :to="{ name: 'login' }">
                                        <span>Login / Registration</span>
                                    </router-link>
                                </li>
                                <li v-if="isAuth">
                                    <span @click="logout()">Logout</span>
                                </li>
                            </ul>
                        </div>
                        <hr>
                        <div v-if="isAuth" class="sidebar-list py-[5%]">
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
                        <div class="sidebar-list py-[5%]">
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

            </div>
        </div>
</header> -->

<!--  /* отключенная логика auth */
// export default {
//     name: "VHeader",

//     data() {
//         return {
//             // menu: document.querySelector('.menu-burger')
//             isMenuOpen: false,
//             // isAuth: false
//         }
//     },

//       computed: {
//         isAuth() {
//           return localStorage.getItem('auth-token')
//         }
//       },

//     created() {
//         if (this.runMenuSwitcher) {
//             window.addEventListener('resize', () => {
//                 this.width = window.innerWidth
//                 if (this.width >= 768) {
//                     // console.log('close menu');
//                     this.closeMenu();
//                 }

//             });
//         }

//     },

//     mounted() {
//     //   let menu = document.querySelector('.menu-burger')
//     //   console.log(menu);
//     },

//     methods: {
//         closeMenu() {
//             this.$refs.menu.firstChild.name = 'menu'
//             this.isMenuOpen = false
//         },

//         runMenuSwitcher() {
//             if (this.$refs.menu.firstChild.name === 'menu') {
//                 this.$refs.menu.firstChild.name = 'close'
//                 this.isMenuOpen = true

//             } else {
//                 this.closeMenu()
//             }
//         },

//         logout() {
//             //   api.auth.logout()
//         }
//     },
// };
 -->