import {
  categoryList,
  categorContentyList,
  intoCategorList,
} from "@/api/category.js";
const state = {
  categoryList: {},
  intoCategorList: {},
};
const mutations = {
  SET_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  SET_INTOCATEGORYLIST(state, intoCategorList) {
    state.intoCategorList = intoCategorList;
  },
};
const actions = {
  async getCategoryList({ commit }) {
    const result = await categoryList();
    if (result.data.categoryL1List) {
      commit("SET_CATEGORYLIST", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(re.message));
    }
  },
  async getCategoryContentList({ commit }, id) {
    const result = await categorContentyList(id);
    if (result.data.categoryL1List) {
      commit("SET_CATEGORYLIST", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(re.message));
    }
  },
  async getIntoCategorList({ commit }, { categoryId, subCategoryId }) {
    const result = await intoCategorList(categoryId, subCategoryId);
    if (result.data.categoryL1) {
      commit("SET_INTOCATEGORYLIST", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(re.message));
    }
  },
};
const getters = {
  navList(state) {
    return state.categoryList.categoryL1List || [];
  },
  contentImg(state) {
    return (
      ((state.categoryList.currentCategory || {}).bannerList || [])[0] || {}
    ).picUrl;
  },
  contentList(state) {
    return state.categoryList.categoryGroupList || [];
  },
  showIndex(state) {
    return (state.intoCategorList.categoryItems || {}).category || {};
  },
  categoryL2List(state) {
    return state.intoCategorList.categoryL2List || [];
  },
  itemList(state) {
    return (state.intoCategorList.categoryItems || {}).itemList || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
