import { getHotKey, getRealTimeKeyList, getSearchGoods } from "@/api";
import cloneDeep from "lodash/cloneDeep";

const state = {
  hotkey: [],
  realTimeKeyList: [],
  searchGoodsList: [],
  directlyList: [],
};

const actions = {
  async getHotKey({ commit }) {
    const re = await getHotKey();
    if (re.code == 200) {
      commit("SET_HOT_KEY", re.data.hotKeywordVOList);
    }
  },

  async getRealTimeKeyList({ commit }, realTimeKey) {
    const re = await getRealTimeKeyList(realTimeKey);
    if (re.code == 200) {
      commit("SET_REAL_TIME_KEY_LIST", re.data);
    }
  },

  async getSearchGoods({ commit }, keyWord) {
    const re = await getSearchGoods(keyWord);
    if (re.code == 200) {
      commit("SET_SEARCH_GOODS", re.data);
    }
  },
};

const mutations = {
  SET_HOT_KEY(state, value) {
    state.hotkey = value;
  },

  SET_REAL_TIME_KEY_LIST(state, value) {
    state.realTimeKeyList = value;
  },

  SET_SEARCH_GOODS(state, value) {
    state.searchGoodsList = value;

    state.directlyList = cloneDeep(value.directlyList);
  },

  DELETE_GOODS(state) {
    state.searchGoodsList = "";
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
