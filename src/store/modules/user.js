import {
    requestUserInfo,
    requestLogin,
    requesLogOut
} from "@/api/login.js"
import getUserTempId from '@/utils/user.js'

const actions = {

    async getUserLogin(miniStore, userInfo) {
        const re = await requestLogin(userInfo)
        if (re.code === 200) {
            localStorage.setItem("token_key", re.data.token)
            miniStore.commit("SET_TOKEN_STATE", re.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(re.message))
        }
    },
    async getUserInfo(miniStore) {
        console.dir(333)
        const re = await requestUserInfo()
        if (re.code === 200) {
            miniStore.commit("SET_USERINFO_STATE", re.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(re.message))
        }
    },
    async getLogOut() {
        const re = await requesLogOut();
        if (re.code === 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("登录失败"))
        }
    },
    async clearToken(miniStore) {
        localStorage.removeItem("token_key")
        miniStore.commit("SET_CLEAR_TOKEN")
    }
}
const mutations = {
    SET_TOKEN_STATE(state, value) {
        state.token = value;
    },
    SET_USERINFO_STATE(state, value) {
        state.userInfo = value
    },
    SET_CLEAR_TOKEN(state) {
        state.token = "";
        state.userInfo = "";
    }
}
const state = {
    userTempId: getUserTempId(),
    token: localStorage.getItem("token_key"),
    userInfo: ""
}
const getters = {}



export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}