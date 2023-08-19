<template>
    <article class="text-white">
        <div class="content py-[7%]">
            <div class="subscription-block">
                <div class="subscription-block__wrapper flex flex-col justify-between items-center">
                    <TitleBlock title="Exclusive mailing of letters" description="Useful tips and personalized offers">
                    </TitleBlock>

                    <div
                        class="sub-item font-sans font-thin tracking-tight text-xs sm:text-sm min-[769px]:text-sm lg:text-base xl:text-xl w-full min-[769px]:w-4/6">
                        <div class="sub-item__wrapper flex flex-col min-[769px]:flex-row justify-between h-full">
                            <ul class="list basis-[30%] h-full flex flex-col m-[5%] min-[769px]:mb-0">
                                <li>
                                    <span>
                                        Personal manager
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Delivery and clearance
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Individual design
                                    </span>
                                </li>
                            </ul>
                            <div class="feedback basis-[70%] h-full border p-4 min-[769px]:mb-[7%]">
                                <div class="bg-white h-full flex flex-col sm:flex-row justify-between items-center p-4">
                                    <div class="inpt basis-[45%] w-full">
                                        <input type="text" placeholder="your e'mail" class="h-[2.8125rem]">
                                    </div>
                                    <div class="btn basis-[45%] w-full pt-4 sm:pt-0">
                                        <ButtonDarkGray button-name="send"></ButtonDarkGray>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </article>
</template>
<script>
import ButtonDarkGray from './ButtonsStyle/ButtonDarkGray.vue';
import TitleBlock from './TitleBlock.vue';

export default {
    name: "SubscriptionBlock",
    components: {
        TitleBlock,
        ButtonDarkGray
    },
    props: {

    },
    data() {
        return {
            subscribeList: [
                'Personal manager', 'Delivery and clearance', 'Individual design'
            ]
        }
    }
}
</script>
<style scoped lang="scss">
article {
    background-image: url(~@/assets/img/background/background.png);


    li {
        list-style-image: url(~@/assets/img/svg/subscribe__icon.svg);
    }
}
</style>