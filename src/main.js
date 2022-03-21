import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from "@/store/index.js"
import TabBar from "@/components/TabBar"
Vue.config.productionTip = false
import "../src/rem.js";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import HeaderNav from "@/components/HeaderNav"
Vue.component('HeaderNav', HeaderNav)
Vue.component('TabBar', TabBar)







new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");