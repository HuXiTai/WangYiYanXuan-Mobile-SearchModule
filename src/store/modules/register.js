import {
    requestRegister
} from "@/api/login.js"

const actions = {
    async getUserRegister(miniStore, userInfo) {
        const re = await requestRegister(userInfo)
        if (re.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(re.message))
        }
    },

}
const mutations = {

}
const state = {

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