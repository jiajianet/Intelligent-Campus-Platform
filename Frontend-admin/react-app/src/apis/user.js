//用户相关的所有请求
import { request } from '@/utils';
// 登录
export function loginAPI(formData) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // 关键头信息
        }
    })
}

//获得用户信息
export function getProfileAPI() {
    return request({
        url: '/user/getUserInfo', method: 'GET'
    })
}