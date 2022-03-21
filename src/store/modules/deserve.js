import {
    requestSwiper,
    requestWaterfall
} from '@/api/deserve'

const state = {
    swiperList: [],
    imgsArr: [],
    group: 0 // request param

}

const mutations = {
    SET_SWIPERLIST(state, swiperList) {
        // console.log(swiperList,"121212");
        state.swiperList = swiperList
        // console.log(state.swiperList,"s");
    },
    SET_IMGSARR(state, imgsArr) {
        state.imgsArr = state.imgsArr.concat(imgsArr)
        state.group++
        // state.imgsArr=imgsArr
    }
}

const actions = {
    async requestSwiper({
        commit
    }) {

        const result = await requestSwiper()
        // console.log(result,"12478");
        if (result.code === "200") {
            commit("SET_SWIPERLIST", result.data.navList)
        }

    },
    async requestWaterfall({
        commit,
        state
    }) {
        const result = await requestWaterfall()
        if (result.code === "200") {
            // this.imgsArr = this.imgsArr.concat(result.data.result[0].topics)
            // console.log(result.data,"data");
            commit("SET_IMGSARR", result.data.result[state.group].topics || [])
            console.log(result.data.result[state.group].topics);
        }
    }
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