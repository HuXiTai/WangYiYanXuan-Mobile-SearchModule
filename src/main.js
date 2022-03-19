import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router.js";
import "../src/rem.js";
import "vant/lib/index.css";
import store from "./store";
import loading from "../public/images/loading.gif";
Vue.config.productionTip = false;
import {
  Button,
  Search,
  Divider,
  Tag,
  Cell,
  Icon,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
  Slider,
  Lazyload,
  Loading,
} from "vant";
Vue.use(Button);
Vue.use(Search);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Slider);
Vue.use(Loading);
Vue.use(Lazyload, {
  loading: loading,
});

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
