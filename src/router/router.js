import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index"
Vue.use(VueRouter);

// 重写push
const lastPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (
  location,
  onComplate = () => {},
  onAbort = () => {}
) {
  return lastPush.call(this, location, onComplate, onAbort);
};
// 重写replace
const lastReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (
  location,
  onComplate = () => {},
  onAbort = () => {}
) {
  return lastReplace.call(this, location).then(onComplate).catch(onAbort);
};

const router = new VueRouter({
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [{
      name: "home",
      path: "/home",
      component: () => import("@/view/Home/home.vue"),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import("@/view/Login"),
    },
    {
      name: "pay",
      path: "/pay",
      component: () => import("@/view/Pay/pay.vue"),
    },
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: () => import("@/view/Pay/components/paysuccess/paysuccess.vue"),
    },
    {
      name: "category",
      path: "/category",
      component: () => import("@/view/Category/category.vue"),
      meta: {
        hiddenTabber: true,
      },
    },
    {
      name: "categoryList",
      path: "/list",
      component: () => import("@/view/Category/components/list/list"),
    },
    {
      name: "center",
      path: "/center",
      component: () => import("@/view/Center/center.vue"),
    },
    {
      name: "detail",
      path: "/detail",
      component: () => import("@/view/Detail/detail.vue"),
      meta: {
        hiddenTabber: true,
      },
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: () => import("@/view/ShopCart/shopCart.vue"),
    },
    {
      path: "/trade",
      name: "trade",
      component: () => import("@/view/Trade/index.vue"),
      //路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path === "/shopcart") {
          next()
        } else {
          next(false)
        }
      },
    },
    {
      name: "search",
      path: "/search",
      component: () => import("@/view/Search/search.vue"),
      meta: {
        hiddenTabber: true,
      },
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/view/Login/components/register.vue")
    },
    {
      name: "deserve",
      path: "/deserve",
      component: () => import("@/view/Deserve/deserve.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token;
  const userInfo = store.state.user.userInfo;
  if (token) {
    if (to.path === "/login") {
      next()
    } else {
      if (userInfo) {
        //直接放行
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (e) {
          alert("token过期，请重新登录")
          //token过期要清除就的token
          store.dispatch("clearToken");
          next("/login")
        }
      }
    }
  } else {
    //暂时先放行
    next("/login");
  }

})

export default router;