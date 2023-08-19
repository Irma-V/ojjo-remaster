<template>
    <Loader v-if="loading || !info"></Loader>

    <article v-else>
        <!-- <p>
                        Вы недавно добавили товары в корзину!
                        Вы можете продолжить заказывать наши товары, а можете для удобства создать аккаунт
        </p> -->
        <p>
            You have recently added items to your shopping cart!
            You can continue to order our products, or you can create an account for convenience.
        </p>

        <form
            class="register bg-white mx-[20%] p-[2%] rounded-xl flex flex-col justify-between sm:px-[15%] min-[769px]:px-[18%] xl:px-[20%]"
            @submit.prevent="submitHandler()" autocomplete="on">

            <div class="input-field">
                <label for="email">E'mail</label>
                <input id="email" type="text" placeholder="example@serv.dom" v-model.trim="email"
                    :class="{ invalid: v$.email.$dirty && v$.email.$invalid }" />
                <small class="helper-text text-red-600" v-for="error of v$.email.$errors" :key="error.$uid">Error in e'mail
                    adress: {{
                        error.$message }}</small>
            </div>

            <div class="input-field">
                <label for="name">User name</label>
                <input id="name" type="text" placeholder="User Name" v-model.trim="name"
                    :class="{ invalid: v$.name.$dirty && v$.name.$invalid }" />
                <small class="helper-text text-red-600" v-for="error of v$.name.$errors" :key="error.$uid">Error in
                    userName: {{
                        error.$message }}</small>
            </div>

            <div class="input-field">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Password" v-model.trim="password"
                    :class="{ invalid: v$.password.$dirty && v$.password.$invalid }" />
                <small class="helper-text text-red-600" v-for="error of v$.password.$errors" :key="error.$uid">Error in
                    password:
                    {{ error.$message }}</small>
            </div>

            <p>
                <label class="flex flex-row justify-between">
                    <input class="basis-[2%] outline-none" type="checkbox" v-model.trim="agree">
                    <span>I accept an <router-link :to="{ name: 'agreement' }" target="_blank"
                            class="lighten-2 text-pink-500">agreement</router-link></span>
                </label>
                <small class="helper-text text-yellow-500"> {{ errorMessage }}</small>
            </p>

            <div class="btn-submit basis-[15%]">
                <ButtonDarkGray button-name="register" type="submit" />
                <!-- <ButtonDarkGray ></ButtonDarkGray> -->
            </div>
        </form>


    </article>
</template>

<script>
import ButtonDarkGray from '@/components/Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue';
import Loader from "@/components/app/Loader.vue"

import { mapGetters, mapActions } from "vuex"
import store from '@/store';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
    name: "AnonimousForm",
    components: {
        ButtonDarkGray,
        Loader,
    },
    props: {},
    data() {
        return {
            email: '',
            password: '',
            name: '',
            agree: false,
            errorMessage: '',
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
            name: { required },
            agree: { checked: value => value }
        }
    },
    mounted() {
        console.log(this.info);
        this.name = this.info.userName
        this.email = this.info.email
        // console.log(this.name, this.email);
        setTimeout(() => {
            M.updateTextFields()
        })
        this.loading = false
    },
    computed: {
        ...mapGetters({
            info: 'info'
        })

    },
    methods: {
        ...mapActions(['updateInfo']),

        async submitHandler() {
            console.log('submitHandler');
            !this.agree ? this.errorMessage = `Warning: You're not accepted the user agreement.` : this.errorMessage = ''
            if (this.v$.$invalid) {
                this.v$.$touch()
                // this.runErrorCatcher()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name,
            }

            try {
                await store.dispatch('auth/registerAnonimous', formData)
                await this.updateInfo({
                    userName: formData.name,
                    email: formData.email,
                    userRole: 'User'
                })
                this.$router.push('profile/?message=registered')
            } catch (error) {
                // this.errorMessage = error.message /* для отображения ошибки в форме */
                store.commit('setError', error.message)
                // throw error.message
                return this.$error
            }
        },
    }
}
</script>