import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/main";
import { onAuthStateChanged } from "firebase/auth";

const routes = [

  //empty-layout
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty"},
    component: () => import("../views/LoginPage"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty"},
    component: () => import("../views/RegisterPage"),
  },
  {
    path: "/agreement",
    name: "agreement",
    meta: { layout: "empty" },
    component: () => import("../views/AgreementPage"),
  },

  //main-layout
  {
    path: "/",
    name: "home",
    meta: { layout: "main"},
    component: () => import("../components/IndexPage.vue"),
    // alias: "/",
  },
  {
    path: "/catalog/category/:productCategory?",
    name: "CatalogPage",
    meta: { layout: "main"},
    component: () => import("../components/CatalogPage.vue"),
    props: true,
  },
  {
    path: "/product/id=:productId",
    name: "ProductPage",
    meta: { layout: "main"},
    component: () => import("../components/ProductPage.vue"),

    props: true,
  },
  {
    path: "/contacts",
    name: "contacts",
    meta: { layout: "main"},
    component: () => import("../components/ContactsPage.vue"),
  },
  {
    path: "/userPage/:username?/favorites",
    name: "favorites",
    meta: { layout: "main", auth: true },
    component: () => import("../components/UsersFavoritesPage.vue"),
  },
  {
    path: "/userPage/:username?",
    name: "user",
    meta: { layout: "main" },
    meta: { layout: "main", auth: true },
    component: () => import("../components/UserPage.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }

router.beforeEach(async (to) => {
    if (await getCurrentUser() && to.name === 'login') {
        console.log('Всё в порядке, вы вошли в систему ранее');
        return '/'
    }

    const requiresAuth = to.matched.some((record) => record.meta.auth)
    if (requiresAuth && !(await getCurrentUser())) {
        console.log('При необходимости можете войти в систему');
        return '/login?message=login'
        // return '/'
        
    }
});

export default router;