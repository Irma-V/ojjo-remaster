import { database } from "@/main";
import { onValue, push, ref, child, update, set } from "firebase/database";
// import { onAuthStateChanged } from "firebase/auth";

export default {
  namespaced: true,
  state: {
    baskets: {},
  },
  getters: {
    baskets(state) {
      return state.baskets;
    },
    basketsIsEmpty(state) {
      return Object.keys(state.baskets).length <= 0;
    },
  },
  mutations: {
    setBaskets(state, baskets) {
      state.baskets = baskets;
    },
  },
  actions: {
    fetchBaskets(context) {},

    async addToBasket(context, data) {
      console.log("полученные данные: ", data.productId, data.userId);
      try {
        if (data.userId !== null) {
          /* записать отдельно bsketID и id товара*/
          const uid = data.userId;
        //   const createBasket = push(ref(database, `users/${uid}/info/basket`));
        //   let products = [];
        //   products.push(data.productId);
        //   console.log(products);
        //   let basketData = {
        //     basketid: `${createBasket.key}`,
        //     products: products,
        //   };
        //   update(ref(database, `users/${uid}/info/basket/`), basketData);
        //   context.commit("setBaskets", basketData);
          
          const nextProductIdx = Object.keys(Object.values(Object.values(this.state.info)[0].basket)[1]).length
        //   const productId = data.productId
          console.log(nextProductIdx)
          // console.log(this.state);
          // console.log(data.productId);
        //   update(push(ref(database, `users/${uid}/info/basket/products/`)), productId)

          //   const uid = data.userId;
          //   const createBasket = push(ref(database, `users/${uid}/info/basket`));
          //   const baskets = push(ref(database,`baskets/${uid}`))
          //   let productId = data.productId
          //   update(ref(database, `users/${uid}/info/basket/${createBasket.key}`), {productId});
          //     context.commit("setBaskets", data);

          //   let addProduct = data.productId;
          //   console.log(addProduct);

          //   const basketData = {
          //     uid: data.userId,
          //     productId: data.productId,
          //   };

          //   const productKey = push(child(ref(database), `baskets`)).key;

          //   const updates = {};
          //   updates['/baskets/' + productKey] = basketData;
          //   updates['/users/'+ data.userId+'/info/basket/'+ productKey] = basketData
          //   return update(ref(database), updates)
        } else {
          console.log(
            "гостю можно предложить зарегаться или создать ячейку для неавторизованного пользователя"
          );
        }
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },
  },
};
