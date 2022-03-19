import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


// 重写push
const lastPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplate = () => {}, onAbort = () => {}) {
    return lastPush.call(this, location, onComplate, onAbort)
}
// 重写replace
const lastReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplate = () => {}, onAbort = () => {}) {
    return lastReplace.call(this, location).then(onComplate).catch(onAbort)
}

const router = new VueRouter({
    scrollBehavior() {
        // return 期望滚动到哪个的位置
        return {
            x: 0,
            y: 0
        }
    },
    routes: [{
            name: 'home',
            path: '/home',
            component: () => import("@/view/Home/home.vue")
        },
        {
            name: 'category',
            path: '/category',
            component: () => import("@/view/Category/category.vue"),
            meta: {
                hiddenTabber: true
            }
        },
        {
            name: 'center',
            path: '/center',
            component: () => import("@/view/Center/center.vue")
        },
        {
            name: 'detail',
            path: '/detail',
            component: () => import("@/view/Detail/detail.vue"),
            meta: {
                hiddenTabber: true
            }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import("@/view/ShopCart/shopCart.vue")
        },
        {
            name: 'search',
            path: '/search',
            component: () => import("@/view/Search/search.vue"),
            meta: {
                hiddenTabber: true
            }
        },
        {
            name: 'deserve',
            path: '/deserve',
            component: () => import("@/view/Deserve/deserve.vue")
        },
        {
            path: '/',
            redirect: '/home'
        }

    ]
})


export default router