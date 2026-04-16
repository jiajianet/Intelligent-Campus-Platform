// axios的封装处理
import axios from 'axios';
import { removeToken } from './token';
import router from '../router';
import { getToken } from './token';
// 根域名配置
// 超时时间
// 请求拦截器 响应拦截器
const request = axios.create({
    withCredentials: true,
    // baseURL: 'http://111.230.253.94:8081',
    baseURL: 'http://localhost:8081',
    timeout: 120000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
    },
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
    //获取token
    //token拼接
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.dir(error)
    if (error.response && error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request }