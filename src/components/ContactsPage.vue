<template>
    <BreadCrumbs></BreadCrumbs>
    <section>
        <article>
            <div class="content">
                <div class="title basis-[5%] font-semibold text-lg tracking-widest uppercase text-center mb-[7%]">contacs
                </div>
                <div class="wrapper flex flex-row justify-between mb-[7%]">
                    <div class="item">
                        <h2>Useful Links</h2>
                        <ul class="text-sm">
                            <li>Shipping</li>
                            <li>Payment</li>
                        </ul>
                    </div>
                    <div class="item">
                        <h2>Useful Links</h2>
                        <ul class="text-sm">
                            <li>Shipping</li>
                            <li>Payment</li>
                        </ul>
                    </div>
                    <div class="item">
                        <h2>Useful Links</h2>
                        <ul class="text-sm">
                            <li>Shipping</li>
                            <li>Payment</li>
                        </ul>
                    </div>
                    <div class="item">
                        <h2>Useful Links</h2>
                        <ul class="text-sm">
                            <li>Shipping</li>
                            <li>Payment</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="map-box w-full h-[50rem] bg-teal-200 my-[7%]"></div>
            </div>
        </article>
    </section>
</template>

<script>
import BreadCrumbs from './Blocks/generalBlocks/BreadCrumbs.vue';



export default {
    name: "ContactsPage",
    components: {
        BreadCrumbs
    },
};
</script>

<style scoped lang="scss">
.wrapper {
    .item {
        h2 {
            font-weight: bold;
        }

        ul {
            li {}
        }
    }
}
</style>