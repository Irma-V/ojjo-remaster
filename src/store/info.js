import { auth, database } from "@/main";
import { onValue, ref, update } from "firebase/database";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default {
  state: {
    info: {},
  },
  getters: {
    info(state) {
      return state.info;
    },
    // пустое ли info
    infoIsEmpty(state) {
      return Object.keys(state.info).length <= 0;
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    // Для метода updateInfo передаем объект с ключами userName, email, и userRole
    async updateInfo(context, toUpdate) {
      try {
        const uid = await context.dispatch("auth/getUid");
        const info = ref(database, `users/${uid}/info`);
        // console.log(toUpdate);
        const updateData = { ...this.getters.info, ...toUpdate };
        update(info, updateData);
        context.commit("setInfo", updateData);
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    async fetchInfo(context) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // console.log(user);
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const info = ref(database, `users/${uid}/info`);
            onValue(info, (snapshot) => {
              const data = snapshot.val();
              //   console.log(data);
              context.commit("setInfo", data);
            });
          }
        });
      } catch (error) {
        throw error;
      }
    },
  },
};
