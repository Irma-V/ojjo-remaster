<template>
    <Loader v-if="loading"></Loader>
    <section v-else>
        <div class="content">
            <div class="userPage">
                <ion-icon name="heart" size="large"></ion-icon>
                This page can visible only users
            </div>
        </div>
    </section>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
export default {
    name: "UsersFavoritesPage",
    components: {
        Loader,
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.loading = false
    },
}
</script>