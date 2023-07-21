<template>
    <section>
        <div class="content">
            <div class="loader flex flex-col items-center">
                <img src="~@/assets/img/svg/loader.png" class="rot" alt="">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "VLoader",
    components: {},
    props: {},
    data() {
        return {

        }
    },
    computed: {
        // color() {
        //     const colors = ['dark-gray', 'white']
        //     return colors[Math.floor(Math.random() * 2)]
        // }
    }
}
</script>

<style scoped>
img.rot {
  animation: 1s linear 0s normal none infinite running rot;
  -webkit-animation: 1s cubic-bezier(0.11, 0.8, 0.76, 0.17) 0s normal none infinite running rot;
  width: 100px;
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>