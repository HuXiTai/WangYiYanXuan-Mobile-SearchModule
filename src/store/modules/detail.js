import {
  getDetailData,
  getAddToCart,
  getShopList,
  getCheckedGoods,
  getChangeAllChecked,
  getDeleteGoods,
  getTradeInfo,
  getOrderNo,
} from "@/api/detail.js";
const state = {
  detail: {},
  shopCartList: [],
  tradeInfo: {},
  tradeAddress: [{
    id: 1,
    userAddress: "银河系太阳旁边小地球",
    userId: 2,
    provinceId: 1,
    consignee: "张三",
    phoneNum: "13700110011",
    isDefault: "1",
    regionId: 1,
    fullAddress: "银河系太阳旁边小地球",
  }, ],
};
const mutations = {
  SET_DETAILDATA_STATE(state, data) {
    state.detail = data;
  },
  SET_SHOPCARTLIST_STATE(state, value) {
    state.shopCartList = value;
  },
  SET_TRADEINFO_STATE(state, value) {
    state.tradeInfo = value;
  },
};
const actions = {
  async getDetailData({
    commit
  }, skuId) {
    const re = await getDetailData(skuId);
    
    if (re.code === 200) {
      commit("SET_DETAILDATA_STATE", re.data);
    }
  },
  //请求购物车列表
  async getShopList(miniStore) {
    const re = await getShopList();
    if (re.code === 200) {
      miniStore.commit("SET_SHOPCARTLIST_STATE", re.data);
    }
  },
  //添加购物车
  async getAddToCart(miniStore, {
    skuId,
    skuNum
  }) {
    const re = await getAddToCart(skuId, skuNum);
    console.log(re);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("加入购物车或者修改数量失败"));
    }
  },
  //改变单个
  async getCheckedGoods(_, {
    skuID,
    isChecked
  }) {
    const re = await getCheckedGoods(skuID, isChecked);
    console.log(re);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("修改数量状态失败"));
    }
  },
  //改变所有商品的选择状态
  async getChangeAllChecked(_, {
    isChecked,
    skuIdList
  }) {
    const re = await getChangeAllChecked(isChecked, skuIdList);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("修改全部状态失败"));
    }
  },
  //删除单个
  async getDeleteGoods(_, skuId) {
    const re = await getDeleteGoods(skuId);
    console.log(re);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("删除商品失败"));
    }
  },

  async getTradeInfo({
    commit
  }) {
    const re = await getTradeInfo();
    console.log(re);
    if (re.code === 200) {
      commit("SET_TRADEINFO_STATE", re.data);
    } else {
      return Promise.reject(new Error("请求订单编号失败"));
    }
  },
  // 提交订单 获取订单编号
  async getOrderNo({
    commit
  }, {
    tradeNo,
    orderInfo
  }) {
    const re = await getOrderNo(tradeNo, orderInfo);
    console.log(re);
    if (re.code === 200) {
      return re.data;
    } else {
      return Promise.reject(new Error("获取订单编号失败"));
    }
  },
};
const getters = {
  skuInfo(state) {
    return state.detail.skuInfo || {};
  },
  price(state) {
    return state.detail.price;
  },
  shopCartListPre(state) {
    return state.shopCartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};