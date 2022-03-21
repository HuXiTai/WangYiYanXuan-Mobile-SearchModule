//request.js专门用来配置axios
//1. npm 下载axios 并引入
import axios from 'axios'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/modules/deserve'


//2.因为我们要给axios配置一些配置项，但是并不是所有的axios都需要，所以可以创建自己的axios实例
const myAxios = axios.create({
  baseURL: "/api1/topic",
  timeout: 10000
})

//3.配置当前axios的拦截器
myAxios.interceptors.request.use((config) => {
  //请求拦截器中的回调函数的参数是 整个请求的配置对象：1.data:发送的数据 2.headers:请求头 3.method:请求方式 4.url:接口地址 等等等

  //当请求发送的时候，激活进度条
  Nprogress.start()

  //拦截器必须要把config对象return出去，继续请求
  return config
}, (err) => {
  //当请求出错 或者拦截器出错的时候，会进入当前函数，当前函数需要返回一个失败的promise实例，供axios请求中的catch接受错误信息
  return Promise.reject(err)

  //当拦截器的这个函数主动处理错误的时候，那么我们就不需要再次传递给axios的catch方法了,这个时候需要中断promise的传递
  // return new Promise(() => {})
})

// 添加响应拦截器
myAxios.interceptors.response.use((response) => {
  //响应拦截器接受的参数response中：1.config:请求的配置对象 2.data:响应回来的数据 3.headers:响应头 4.request：XMLHttpRequest对象 5.status:状态码 6.statusText:状态短语

  //当响应回来数据之后，结束进度条
  Nprogress.done()

  // 在这里return什么，axios请求接受的结果就是什么，一般会返回response.data
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default myAxios;