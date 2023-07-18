<template>
    <section>
        <div class="content">
            <div class="userPage">
                <ion-icon name="heart" size="large"></ion-icon>
                This page can visible only users
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "UsersFavoritesPage",
}
</script>

<style scoped lang="scss">
section {
    &:first-child {
        margin-top: 7.25rem;
    }
}
</style>