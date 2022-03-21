import {

} from '@/api/detail.js'
const state = {

    shopCartList: [{
        price: 5999,
        skuDesc: "小米10 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 12GB+256GB 陶瓷黑 游戏手机",
        skuName: "小米10 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 8GB+128GB 陶瓷黑 游戏手机",
        tmId: 1,
        skuDefaultImg: "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAIpgZAAIvrX6L9fo612.jpg",
        isChecked: true,
        count: 2,
        id: 1
    },{
        price: 6999,
        skuDesc: "小米10 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 12GB+256GB 陶瓷黑 游戏手机",
        skuName: "小米10 至尊纪念版 双模5G 骁龙865 120HZ高刷新率 120倍长焦镜头 120W快充 8GB+128GB 陶瓷黑 游戏手机",
        tmId: 1,
        skuDefaultImg: "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAIpgZAAIvrX6L9fo612.jpg",
        isChecked: true,
        count: 3,
        id: 2
    }
]

}
const mutations = {
    SET_ADDSHOPLIST_STATE(state, data) {
        state.shopCartList.push(data)
    },
    SET_DELETE_SHOPCART(state, index) {
        state.shopCartList.splice(index, 1)
    }
}
const actions = {

}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}