// 引入axios库
import axios from 'axios';

// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://localhost:9999/api/', // 设置请求的基础路径
  timeout: 5000, // 设置请求超时时间
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  }
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，比如添加token、修改请求头等
    const token = localStorage.getItem('token')
    if(token){
      //token写入请求头
    }
    return config; // 返回处理后的config
  },
  (error) => {
    // 请求错误时的回调函数，返回一个被拒绝的Promise对象
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 在响应返回之前做一些处理，比如解析数据等
    return response.data; // 返回处理后的响应数据
  },
  (error) => {
    // 响应错误时的回调函数，返回一个被拒绝的Promise对象
    return Promise.reject(error);
  }
);

// 导出axios实例
export default request;