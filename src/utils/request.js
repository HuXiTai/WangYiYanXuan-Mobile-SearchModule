//request.js专门用来配置axios
//1. npm 下载axios 并引入
import axios from "axios";

import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import store from "@/store";

//2.因为我们要给axios配置一些配置项，但是并不是所有的axios都需要，所以可以创建自己的axios实例
const myAxios = axios.create({
  baseURL: "/my",
  timeout: 10000
})

myAxios.interceptors.request.use((config) => {
  //请求拦截器中的回调函数的参数是 整个请求的配置对象：1.data:发送的数据 2.headers:请求头 3.method:请求方式 4.url:接口地址 等等等

  //当请求发送的时候，激活进度条
  Nprogress.start()

  //配置用户请求临时id
  config.headers.userTempId = store.state.user.userTempId;
  //配置用户当前的token信息 用来请求用户信息
  // config.headers.token = store.state.user.token;
  // let userTempId = store.state.user.userTempId;
  config.headers.token = store.state.user.token;
  //拦截器必须要把config对象return出去，继续请求
  return config
}, (err) => {
  return Promise.reject(err)
})
myAxios.interceptors.response.use((response) => {
  // Nprogress.done()
  // 对响应数据做点什么
  Nprogress.done()
  return response.data;
}, (error) => {

  // 对响应错误做点什么
  return Promise.reject(error);
});

export default myAxios;