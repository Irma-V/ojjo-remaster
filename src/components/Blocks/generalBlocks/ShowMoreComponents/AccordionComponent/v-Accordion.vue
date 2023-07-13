<template>
    <div class="accordion-item" :class="accordionItemStyle">
        <div class="accordion-item__wrapper" :class="accordionWrapperStyle">
            <div @click="showContent" ref="ApplyAccordion"
                class="accordion-title" :class="accordionTitleStyle">
                <div class="accordion-title-self font-bold text-base">
                    <slot name="accordionTitle"></slot>
                </div>
                <div class="accordion-arrrow" :class="{'hidden': hideArrow}">
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

        accordionItemStyle: { type: String },
        accordionWrapperStyle: { type: String },
        accordionTitleStyle: { type: String },
       
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
