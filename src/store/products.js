import { auth, database } from "@/main";
import { ref, onValue, update, child, set, push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  namespaced: true,
  state: {
    products: {},
  },
  getters: {
    products(state) {
      return state.products;
    },
    // Пусто ли в products
    productsIsEmpty(state) {
      return Object.keys(state.products).length <= 0;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    updateProducts(context, toUpdate) {
      try {
        onAuthStateChanged(auth, (user) => {
          const products = ref(database, `products/`);
          let updateData = {};
          const adminEmail = 'vermeil_irma@mail.ru';
          if (user) {
            if (user.email === adminEmail) {
              updateData = { ...this.getters.products, ...toUpdate };
              update(products, updateData);
              context.commit("setProducts", updateData);
            } else {
              console.log("не админ!");
              return;
            }
          } else {
            console.log("не залогинен!");
            return;
          }
        });
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        try {
          const products = ref(database, `products`);
          onValue(products, (snapshot) => {
            const data = snapshot.val();
            context.commit("setProducts", data);
            return resolve(data);
          });
        } catch (error) {
          context.commit("setError", error);
          return reject(error);
        }
      });
    },

    createProduct(context, {dataset, lastIndex}) {
      try {
        console.log(dataset, lastIndex + 1);
        const product = ref(database, `products/${lastIndex + 1}`);
        update(product, dataset);
        context.commit("setProducts", dataset);
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },
  },
};
