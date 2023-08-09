import { createApp } from "vue";
import App from "./App.vue";

import "./assets/tailwind.css";
import "./assets/scss/style.scss";
import router from "./router";
import VueAgile from "vue-agile";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";

// import { api } from '@/api.js'
// import axios from "axios";
// import VueAxios from "vue-axios";

/* firebase */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/* bootstrap */
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Vuetify */
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

const firebaseConfig = {
  apiKey: "AIzaSyDCX-XPoUNpW5prGsuR0es9N0gwZZS91x0",
  authDomain: "ojjo-remaster.firebaseapp.com",
  databaseURL: "https://ojjo-remaster-default-rtdb.firebaseio.com",
  projectId: "ojjo-remaster",
  storageBucket: "ojjo-remaster.appspot.com",
  messagingSenderId: "160135922728",
  appId: "1:160135922728:web:4c99711a7b5b5d58c8a11d",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// const vuetify = createVuetify({
//     components,
//     directives,
//   })

createApp(App)
  .use(router)
  .use(VueAgile)
  .use(store)
  .use(messagePlugin)
//   .use(BootstrapVue)
//   .use(vuetify)
  .component("Loader", Loader)
  //   .use(VueAxios, axios)
  .mount("#app");
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("auth-token");

const auth = getAuth();

export { app, database, auth };
