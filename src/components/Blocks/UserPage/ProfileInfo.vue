<template>
    <Loader v-if="loading || !info"></Loader>

    <article>
        <!-- <ion-icon name="person" size="large"></ion-icon>
        <p class="font-bold"> {{ userName }} </p> -->
        <form @submit.prevent="submitHandler()">
            <div class="profile-editor py-[2%] min-[769px]:px-[15%] lg:px-[20%]">
                <TitleBlock title="your profile" description="here you can edit personal information"></TitleBlock>

                <div class="input-field">
                    <label for=" name">Name</label>
                    <input id="name" type="text" :placeholder="name" v-model="name"
                        :class="{ invalid: v$.name.$dirty && v$.name.$invalid }">
                    <small class="helper-text" :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
                        v-for="error of v$.name.$errors" :key="error.$uid">
                        invalid name: {{ error.$message }}
                    </small>
                </div>

                <div class="input-field">
                    <label for="email">E'mail</label>
                    <input id="email" type="text" :placeholder="email" v-model="email"
                        :class="{ invalid: v$.email.$dirty && v$.email.$invalid }">
                    <small class="helper-text" :class="{ invalid: v$.email.$dirty && v$.email.$invalid }"
                        v-for="error of v$.email.$errors" :key="error.$uid">
                        invalid email: {{ error.$message }}
                    </small>
                </div>

                <div class="refreshBtn ">
                    <ButtonDarkGray button-name="refresh" type="submit"></ButtonDarkGray>
                </div>
            </div>

        </form>

    </article>
</template>

<script>
import TitleBlock from "../generalBlocks/TitleBlock.vue";
import ButtonDarkGray from "../../Blocks/generalBlocks/ButtonsStyle/ButtonDarkGray.vue";
import Loader from "@/components/app/Loader.vue"

import { mapGetters, mapActions } from "vuex"
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
    name: "ProfileInfo",
    components: {
        TitleBlock,
        ButtonDarkGray
    },
    props: {
        userName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            name: '',
            email: '',
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            name: { required },
            email: { required, email }
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
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                await this.updateInfo({
                    userName: this.name,
                    email: this.email
                })
            } catch (error) {

            }
        },
    }
}
</script>

<style scoped lang="scss"></style>