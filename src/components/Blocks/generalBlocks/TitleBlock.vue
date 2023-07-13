<template>
    <div class="title-block mb-[7%]">
        <div class="title-block__wrapper flex flex-col-reverse items-center text-center">
            <div class="title font-serif text-3xl font-bold tracking-tight "> {{ title }}</div>
            <div class="description font-sans font-thin tracking-tight text-xl"> {{ description }}</div>
        </div>
</div>
</template>
<script>
export default {
    name: "TitleBlock",
    components: {

    },
    props: {

        title: {
            type: String,
            default: "Заголовок:"
        },
        description: {
            type: String,
            default: "Описание:"
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped lang="scss"></style>