import Vue from "vue";
import Vuex from "vuex";
import search from "@/store/modules/search";
Vue.use(Vuex);

const state = {};
const actions = {};
const mutations = {};
const getters = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    search,
  },
});
