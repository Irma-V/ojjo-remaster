<template>
    <!-- <section> -->
    <div class="content pt-[10%] flex flex-col items-center">
        <form
            class="login bg-white mx-[20%] p-[2%] rounded-xl flex flex-col justify-between sm:px-[15%] md:px-[18%] xl:px-[20%]"
            @submit.prevent="submitHandler()">
            <div class="logo flex justify-center">
                <router-link :to="{ name: 'home' }">
                    <img src="~@/assets/img/logo/OJJO-black.png" alt="OJJO.png" />
                </router-link>
            </div>
            <h1 class="text-center uppercase font-bold">Sign in</h1>

            <div class="input-field">
                <label for="email">E'mail</label>
                <input id="email"  type="text" placeholder="example@serv.dom" v-model.trim="email"
                    :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"/>
                <small class="helper-text text-red-600" v-for="error of v$.email.$errors" :key="error.$uid">Error in e'mail adress: {{
                    error.$message }}</small>
            </div>

            <div class="input-field">
                <label for="password">Password</label>
                <input id="password"  type="password" placeholder="Password" v-model.trim="password"
                    :class="{ invalid: v$.password.$dirty && v$.password.$invalid }" />
                <small class="helper-text text-red-600" v-for="error of v$.password.$errors" :key="error.$uid">Error in password:
                    {{ error.$message }}</small>
            </div>
            <div class="btn-submit basis-[15%]">
                <ButtonDarkGray button-name="Login" type="submit" />
                <!-- <ButtonDarkGray ></ButtonDarkGray> -->
            </div>
            <p class="text-center">
                No account, <router-link :to="{ name: 'register' }" class="link font-bold uppercase">register</router-link>
            </p>
            <!-- <button type="submit">Login</button> -->
        </form>
    </div>
    <!-- </section> -->
</template>

<script>
import ButtonDarkGray from '@/components/Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import store from '@/store';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
    name: "LoginPage",
    components: {
        ButtonDarkGray
    },
    data() {
        return {
            // username: 'kminchelle',
            // password: '0lelplR',
            email: '',
            password: '',
            authErrorMsg: '',
        };
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
        }
    },
    mounted() {
        // this.$message('test text test text test text test text test text test text test text test text test text test text')
    },
    methods: {
        
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }

            try {
                await store.dispatch('auth/logIn', formData)
                this.$router.push('/?message=loggedin_success')
            } catch (error) {
                // this.authErrorMsg = error.message /* для отображения ошибки в форме */
                store.commit('setError', error.message)
                // throw error.message
                return this.$error
            }
        },
    },

}
</script>

<style scoped lang="scss">
section {
    &:first-child {
        margin-top: 6.25rem;
    }
}

form {
    .input-field {
        .invalid {
            outline: 0.1rem solid red;
        }
    }

}
</style>

<!-- /* отключенная логика auth */
    // login() {
        //     const { username, password } = this

        //     /* vuex */
        //     // this.$store.dispatch('auth', { username, password }).then(() => {
        //     //     alert('SUCCESS');
        //     //     this.$router.push('/')
        //     // })

        //     /* REST API */
        //     api.auth.login({ username, password })
        //         .then((res) => {
        //             localStorage.setItem('auth-token', res.token)
        //             this.$router.push('/')
        //         })
        //         .catch(() => {
        //             console.log('Ошибка авторизации')
        //         })
        // }
 -->