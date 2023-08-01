<template>
    <div class="accordion-item" :class="accordionItemStyle">
        <div class="accordion-item__wrapper" :class="accordionWrapperStyle">
            <div @click="showContent" ref="ApplyAccordion" class="accordion-title" :class="accordionTitleStyle">
                <div class="accordion-title-self font-bold text-base">
                    <slot name="accordionTitle"></slot>
                </div>
                <div class="accordion-arrrow" :class="{ 'hidden': hideArrow }">
                    <ion-icon size="large" class="cursor-pointer" name="chevron-up-outline"></ion-icon>
                </div>
            </div>
            <div class="accordion-content">
                <slot name="accordionContent"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "v-Accordion",

    props: {
        // accordionStyle: { 
        //     type:  Array,
        // },

        accordionItemStyle: {
            type: String,
            default:''
        },
        accordionWrapperStyle: {
            type: String,
            default:'flex flex-col w-full py-[2%]'
        },
        accordionTitleStyle: {
            type: String,
            default:'flex flex-row justify-between items-center'
        },

        hideArrow: {
            type: Boolean,
            required: true,
        }
    },

    methods: {

        showContent() {
            let arrow = this.$refs.ApplyAccordion.lastChild.firstChild
            let content = this.$refs.ApplyAccordion.nextElementSibling

            if (content.style.maxHeight) {
                arrow.classList.remove('animate')
                content.style.maxHeight = null;

            }
            else {
                arrow.classList.add('animate')
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        },

    }
}
</script>

<style scoped lang="scss">
// стилизация для аккордеона
.accordion-title {
}

.accordion-content {
    font-size: 0.875rem;

    transition: 0.3s ease-in-out;
    max-height: 0;
    overflow: hidden;
}

.accordion-item {
    .accordion-item__wrapper {
        
        .accordion-title {
            .accordion-title-self {
                flex-basis: 90%;
                font-size: 1rem;
                font-weight: bold;
            }

            .accordion-arrrow {
                flex-basis: 10%;
                font-size: 0.875rem;
                text-align: center;
            }
        }
    }
}

ion-icon {
    transition: 0.3s;
}

.animate {
    transform: rotate(180deg);
}</style>