import request from '@/utils/request'


export const getVerify = (phone) => {
    return request.get(`api/user/passport/sendCode/${phone}`)
}

export const requesLogOut = () => {
    return axios.get(`api/user/passport/logout`)
}



export const requestRegister = (userInfo) => {
    return request.post(`api/user/passport/register`, userInfo)
}


//登录逻辑
export const requestLogin = (userInfo) => {
    return request.post(`api/user/passport/login`, userInfo)
}

//根据token获取用户信息（token已经在请求头配置好了）
export const requestUserInfo = () => {
    return request.post(`/user/passport/auth/getUserInfo`)
}