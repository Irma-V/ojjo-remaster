import { auth, database } from "@/main";
import { onValue, push, ref, child, update, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

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
    clearBaskets(state) {
      state.baskets = {};
    },
  },
  actions: {
    createBaskets(context) {
      //   console.log(context.getters.basketsIsEmpty);
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            let getData = {
              uid: user.uid,
            //   products: [],
              basketId: user.uid.slice(15),
            };

            let setData = {
              basketId: getData.basketId,
            //   products: getData.products,
            };
            set(ref(database, `baskets/${getData.uid}`), setData);
            context.commit("setBaskets", getData);

            return;
          }
        });
      } catch (error) {}
    },

    fetchBaskets(context) {
      return new Promise((resolve, reject) => {
        try {
          const baskets = ref(database, `baskets`);
          onValue(baskets, (snapshot) => {
            const data = snapshot.val();
            context.commit("setBaskets", data);
            return resolve(data);
          });
        } catch (error) {
          context.commit("setError", error);
          return reject(error);
        }
      });
    },

    async addToBasket(context, data) {
      console.log("полученные данные: ", data.productId, data.userId);
      try {
        if (data.userId !== null) {
            push(ref(database, `baskets/${data.userId}/products`), data.productId);
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
