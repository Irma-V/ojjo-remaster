<template>
  <footer class="w-full py-[7%]">
    <div class="content flex flex-col px-[15%] font-sans tracking-tight text-xl text-[#333333]">

      <div class="footer-wrapper flex flex-row justify-between font-thin flex-wrap min-[980px]:flex-nowrap">
        <div class="footer-list px-[3%] py-[2%] w-full sm:w-1/2 min-[900px]:w-1/3 min-[980px]:w-1/4 xl:w-1/5">
          <h2>Useful Links</h2>
          <hr>
          <ul class="text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl">
            <li>Shipping</li>
            <li>Payment</li>
            <li>Promotions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div class="footer-list px-[3%] py-[2%] w-full sm:w-1/2 min-[900px]:w-1/3 min-[980px]:w-1/4 xl:w-1/5">
          <h2>payment</h2>
          <hr>
          <ul class="text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ullamcorper justo, nec, pellentesque.</li>
            <li>
              <div class="logos flex flex-row justify-between w-1/2">
                <div class="logos-item basis-[45%]">
                  <img src="~@/assets/img/logo/visa.png" alt="">
                </div>
                <div class="logos-item basis-[45%]">
                  <img src="~@/assets/img/logo/mastercard.png" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="footer-list px-[3%] py-[2%] w-full sm:w-1/2 min-[900px]:w-1/3 min-[980px]:w-1/4 xl:w-1/5">
          <!-- <router-link :to="{ name: 'contacts' }"> -->
            <h2>contacts</h2>
          <!-- </router-link> -->
          <hr>
          <ul class="text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl">
            <li class="flex flex-row"> <img class="mr-[5%]" src="~@/assets/img/svg/phone__icon.svg" alt=""> 8 (812) 234-56-55</li>
            <li class="flex flex-row"> <img class="mr-[5%]" src="~@/assets/img/svg/phone__icon.svg" alt=""> 8 (812) 234-56-55</li>
            <li class="flex flex-row"> <img class="mr-[5%]" src="~@/assets/img/svg/mail__icon.svg" alt=""> ojjo@ojjo.ru</li>
          </ul>
        </div>
        <div class="footer-list px-[3%] py-[2%] w-full sm:w-1/2 min-[900px]:w-1/3 min-[980px]:w-1/4 xl:w-1/5">
          <h2>Social Media</h2>
          <hr>
          <ul class="text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper justo, nec, pellentesque.</li>
            <li>
              <div class="social-media-group flex flex-row justify-between">
                <img src="~@/assets/img/svg/youtube.svg" alt="">
                <img src="~@/assets/img/svg/vk.svg" alt="">
                <img src="~@/assets/img/svg/facebook.svg" alt="">
                <img src="~@/assets/img/svg/telegram.svg" alt="">
                <img src="~@/assets/img/svg/e__logo.svg" alt="">

              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="flex flex-row justify-between font-thin text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl flex-wrap sm:flex-nowrap">
        <span class="w-1/2 sm:w-1/4">(c) 2023 OJJO jewelry</span>
        <span class="w-1/2 sm:w-1/4">public offer agreement</span>
        <span class="w-1/2 sm:w-1/4">To counterparties</span>
        <span class="font-bold w-1/2 sm:w-1/4">
          <a href="#">
            by Vermel Irma
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
};
</script>

<style scoped lang="scss">
footer {
  .footer-wrapper {
    .footer-list {
      // width: 20%;
      // padding-bottom: 3%;

      h2 {
        text-transform: uppercase;
        padding-bottom: 5%;

      }

      ul {
        li {
          text-transform: capitalize;
          padding-top: 3%;
          padding-bottom: 3%;
        }

        // .telephoneIcon {
        //   list-style-image: url(~@/assets/img/svg/phone__icon.svg);
        // }

        // .mailIcon {
        //   list-style-image: url(~@/assets/img/svg/mail__icon.svg);

        // }
      }
    }
  }
}
</style>