/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = 'http://111.230.253.94:8082/waimai-api/file/getImgStream?fileName='
  baseUrl = "http://111.230.253.94:8082/waimai-api"
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = 'http://111.230.253.94:8082/waimai-api';
  imgBaseUrl = 'http://111.230.253.94:8082/waimai-api/file/getImgStream?fileName=';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
