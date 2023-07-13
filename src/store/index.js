import { createStore } from "vuex";
import auth from "./auth";

const store =  createStore({
  state() {
    return {
      products: [],
      error: null,
    };
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    error(state) {
      return state.error;
    },
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
    setError(state, error) {
      state.error = error;
    },
    clrError(state) {
      state.error = null;
    },
  },
  actions: {
    loadProducts({ commit }, creds) {
      // вызываем метод апи, получаем товары
      api.products.getProducts().then((result) => {
        // state.products = result.products
        commit("setProducts", result.products);
      });
    },
    // auth({commit}, creds) {

    // }
  },
  modules: {
    auth,
  },
});

export default store