import Vue from "vue";
import Vuex from "vuex";
import category from "@/store/modules/category";
import register from "@/store/modules/register";
import user from "@/store/modules/user";
import search from '@/store/modules/search'
import detail from '@/store/modules/detail'
import deserve from '@/store/modules/deserve'
import home from '@/store/modules/home'

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    category,
    register,
    user,
    search,
    detail,
    deserve,
    home
  },
});