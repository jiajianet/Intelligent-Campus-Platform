//封装文章相关的api接口
import {request} from '@/utils';

//获取频道分类
export function getChannelAPI() {
    return request({
        url: '/user/channels',
        method: 'GET'
    })
}

//提交表单
export function createArticleAPI(data) {
    return request({
        url: '/user/articles?draft=false',
        method: 'POST',
        data
    })
}

export function updateArticleAPI(data) {
    return request({
        url: `/user/articles/${data.id}?draft=false`,
        method: 'PUT',
        data
    })
}

//获取文章列表
export function getArticleListAPI(params) {
    return request({
        url: '/user/articles',
        method: 'GET',
        params
    })
}

//获取文章详情
export function getArticleDetailAPI(id) {
    return request({
        url: `/user/articles/${id}`,
        method: 'GET'
    })
}

//删除文章
export function deleteArticleAPI(id) {
    return request({
        url: `/user/articles/${id}`,
        method: 'DELETE'
    })
}

//上传图片
export function uploadImageAPI(data, onProgress) {
    return request({
        url: `/user/upload`,
        method: 'POST',
        data,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: onProgress
    })
}