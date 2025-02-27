# 智慧校园服务一体化平台项目
智慧校园服务一体化平台由犀焰澄泓团队开发

## 前端平台
前端平台是本项目主要内容网页Web端的实现，前端平台代码位于仓库 <code>Frontend</code> 文件夹下，由 H5 + CSS + JS 代码编写

### 课程表功能
课程表功能代码位于仓库 <code>Frontend/timetable</code> 文件夹下，采用Vue.js+Webpack进行编写

部署方法：
Node.js <code>npm run build</code>


## 前端管理平台
前端平台管理项目是管理智慧校园平台系统的网页Web端的实现，前端管理平台项目代码位于仓库 <code>Frontend-admin</code> 文件夹下，由 React.js + Ant Design 框架编写

部署方法：
Node.js <code>npm init
              npm run start</code>


## 后端服务平台
后端服务平台是本项目全部内容后台服务端的实现，后端服务平台代码位于仓库 <code>Backend</code> 文件夹下，采用 SpringBoot + MySQL + Redis 技术

## 犀焰澄泓智慧校园外卖
智慧校园外卖平台代码位于仓库 <code>xiyanchenghong-waimai-master</code> 文件夹下，采用Vue.js+Element UI+Webpack技术，后端使用 Springboot + MySQL + MongoDB + Ehcache 技术

### 手机端前端页面
智慧校园外卖平台代码位于仓库 <code>xiyanchenghong-waimai-master/xiyanchenghong-waimai-mobile</code> 文件夹下，采用Vue.js+Element UI+Webpack技术

部署方法：
Node.js <code>npm run build</code>

# 文章管理系统

## 1.简介

- 本系统是用react和ant Design前端框架和后端SpringBoot框架maven构建工具编写的

## 2.快速开始

### 2.1准备环境

1. `Java`后端环境jdk20
2. `MySQL`数据库服务8.0.xx
*但因为现在的`idea`集成，因此可以忽略*

### 2.2开发人员搭建

#### 前端

- 跳转到在项目的`react-app`文件夹下
- 在终端输入指令`npm install`
- 使用指令`npm start`启动

#### 后端

- 修改配置文件`src/main/resources/application.properties`修改成自己的数据库名称和密码，服务器这修改对应的
- 导入`src/main/resources/sql/data_user.sql和school.sql`文件到数据库里面
- 启动application类

## 3.系统配置

### 3.1基本配置

- `react-app/craco.config.js`前端配置文件
- `src/main/resources/application.properties`开发启动的配置

### 3.2图片上传配置

- `src/main/resources/application.properties`中配置本地位置存储文章上传的文件
- `upload.dir=输入自己本地路径/uploads`这个是文件上传的具体位置
- `image.base-url=输入自己后端地址/user/images/`这是前端显示已经上传的`get`接口`api`，其中后端地址要自己配置
- `spring.web.resources.static-locations=file:uploads/`可以不用动，但是要保证和保存图片的文件夹名字相同

## 4.接口文档

### 4.1获取token

- [请查看其他文档](#5qa)

### 4.2请求接口示例

下面是对`axios`库的封装一部分，用于处理`http`请求

```js
const request = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8081',
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
    },
})
```

这是获取用户频道信息的`api`，通过返回已经封装好的`request`函数去发起请求

```js
export function getChannelAPI() {
    return request({
        url: '/user/channels',
        method: 'GET'
    })
}

```

### 4.3接口返回对象

接口返回对象有一个`Result`去统一处理返回的数据

```java
public class Result{
    private String code;
    private String msg;
    private T data;
    private String token;

    //getter,setter
}

```

- `code`返回时的状态值
- `msg`返回信息的描述
- `data`返回的具体数据
- `token`请求返回时的具体令牌JWT

### 4.4接口返回的分页对象

前端发送请求传输请求页码和每页数量，通过页码和每页数量在数据库中用limit和offset子句去约束输出结果

```java
  public ResponseEntity<Object> getArticles(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "perPage", defaultValue = "10") int perPage,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "channelId", required = false) Long channelId,
            @RequestParam(value = "beginPubDate", required = false) String beginPubDate,
            @RequestParam(value = "endPubDate", required = false) String endPubDate)

```

- `page`是请求页码
- `perPage`是每页数量

### 4.5滑块验证码

本系统的滑块验证出自[AJ-Captcha: 行为验证码(滑动拼图、点选文字)，前后端(java)交互，包含vue/h5/Android/IOS/flutter/uni-app/react/php/go/微信小程序的源码和实现](https://gitee.com/anji-plus/captcha)

- 获取图片接口地址POST`/captcha/get`

- 参数

  - `captchaType`
  - `clientUid`
  - `ts`

- 参数数据结构

```json
{
    "captchaType": "blockPuzzle",
    "clientUid": "slider-234c78f8-aa26-47d9-903f-bfe358816e03",
    "ts": 1740493730856
}

```

- 返回

```json
{
    "repCode": "0000",
    "repMsg": null,
    "repData": {
        "captchaId": null,
        "projectCode": null,
        "captchaType": null,
        "captchaOriginalPath": null,
        "captchaFontType": null,
        "captchaFontSize": null,
        "secretKey": "yHvNOAADvF2FKwG4",
        "wordList": null,
        "jigsawImageBase64": base64,
        "originalImageBase64": base64,
        "pointList": null,
        "pointJson": null,
        "token": "e00e71ee5ca2495cbe9f1dedf0a3d06e",
        "result": false,
        "captchaVerification": null,
        "clientUid": null,
        "ts": null,
        "browserInfo": null
    },
    "success": true
}

```

- 验证图片接口地址POST`/capthca/check`

- 参数

  - `captchaType`
  - `pointJson`
  - `token`
  - `clientUid`
  - `ts`

- 返回响应成功

```json
{
    "repCode": "0000",
    "repMsg": null,
    "repData": {
        "captchaId": null,
        "projectCode": null,
        "captchaType": "blockPuzzle",
        "captchaOriginalPath": null,
        "captchaFontType": null,
        "captchaFontSize": null,
        "secretKey": null,
        "originalImageBase64": null,
        "point": null,
        "jigsawImageBase64": null,
        "wordList": null,
        "pointList": null,
        "pointJson": "tjcUx5kcRRXBVOqvskE2Ig==",
        "token": "e00e71ee5ca2495cbe9f1dedf0a3d06e",
        "result": true,
        "captchaVerification": null,
        "clientUid": null,
        "ts": 1740493733782,
        "browserInfo": null
    },
    "success": true
}

```

- 返回响应过时

```json
{
    "repCode": "6110",
    "repMsg": "验证码已失效，请重新获取",
    "repData": null,
    "success": false
}
```

- 返回响应失败

```json
{
    "repCode": "6111",
    "repMsg": "验证失败",
    "repData": null,
    "success": false
}
```

### 4.6用户相关

#### 4.6.1登录

- 提交表单地址POST`/user/login`
- 参数
  - uno
  - password（哈希加密）
  - captchaVerification
- 返回

```json
{
    "code": "0",
    "msg": "登录成功！",
    "data": {
        "uid": 21,
        "uschool": "好学校",
        "uno": "123454321",
        "password": "",
        "uname": "小曾",
        "email": "",
        "upic": "/www/jars/avatars/default_avatar.png",
        "schedfile": "",
        "role": "STUDENT",
        "emailVerified": true
    },
    "token": ""
}
```

#### 4.6.2获取-用户信息

- 地址GET`/user/getUserInfo`
- 参数
  - 无
- 返回

```json
{
    "code": "0",
    "msg": "查询成功！",
    "data": {
        "uid": 21,
        "uschool": "广州软件学院",
        "role": "STUDENT",
        "uname": "小曾",
        "uno": "",
        "avatarBase64": "",
        "email": "",
        "emailverified": true
    },
    "token": null
}
```

- 只是模板，功能待实现

### 4.7文章管理

#### 4.7.1获取-文章列表

- 地址GET`/user/articles`
- 参数
  - channelId:
  - beginPubDate:
  - endPubDate:
  - page: 1
  - perPage: 4
  -返回

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "id": null,
        "title": null,
        "channelId": null,
        "content": null,
        "cover": null,
        "pubDate": null,
        "results": [
            {
                "id": 116,
                "title": "爱你",
                "status": 0,
                "commentCount": 0,
                "likeCount": 0,
                "readCount": 0,
                "channelId": 6,
                "pubDate": "2025-02-20 23:05:48",
                "content": "<p>测试测试册谔</p>",
                "cover": {
                    "type": 1,
                    "image": "http://localhost:8081/user/images/927704e1_logo.png"
                }
            }
        ],
        "totalCount": 5,
        "totalPages": 2,
        "page": 1,
        "perPage": 4
    },
    "token": null
}

```

#### 4.7.2获取-文章详细

- 地址GET`/user/articles/{id}`
- 参数
  - `id`
- 返回

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "id": "116",
        "title": "爱你",
        "channelId": 6,
        "content": "<p>测试测试册谔</p>",
        "cover": {
            "type": 1,
            "image": "http://localhost:8081/user/images/927704e1_logo.png"
        },
        "pubDate": "2025-02-20T23:05:48",
        "results": null,
        "totalCount": 0,
        "totalPages": 0,
        "page": 0,
        "perPage": 0
    },
    "token": null
}
```

#### 4.7.3编辑-文章

- 地址PUT`/user/articles/{id}?draft=false`
- 参数
  - `title`
  - `content`
  - `cover`
    - `type`
    - `image`
    - `channelId`
    - `id`
- 返回

```json
{
    "code": "0",
    "msg": "文章更新成功",
    "data": {
        "id": 116,
        "title": "爱你",
        "status": 0,
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "channelId": 6,
        "pubDate": "2025-02-20 23:05:48",
        "content": "<p>测试测试册谔</p>",
        "cover": {
            "type": 1,
            "image": "http://localhost:8081/user/images/927704e1_logo.png"
        }
    },
    "token": null
}
```

#### 4.7.4删除-文章

- 地址DELETE`/user/articles/{id}`
- 参数
  - `id`
- 返回
  - `文章删除成功`

#### 4.7.5新增-文章

- 地址POST`/user/articles?draft=false`
- 参数
  - `title`
  - `content`
  - `cover`
    - `type`
    - `image`
  - `channelId`
- 返回

```json
{
    "id": 122,
    "title": "爱你",
    "status": 0,
    "commentCount": 0,
    "likeCount": 0,
    "readCount": 0,
    "channelId": 6,
    "pubDate": "2025-02-26 01:07:46",
    "content": "<p>我爱你</p>",
    "cover": {
        "type": 0,
        "image": null
    }
}
```

### 4.8其他接口

#### 4.8.1获取-文章频道

- 地址GET`user/channels`
- 参数
  - `无`
- 返回

```json
[
    {
        "id": 1,
        "name": "推荐"
    },
    {
        "id": 2,
        "name": "科技"
    },
    {
        "id": 3,
        "name": "娱乐"
    }
]
```

#### 4.8.2上传图片

- 地址POST`/user/upload`
- 参数
  - `image(binary)`
- 返回

```json
{
    "code": "0",
    "msg": "上传成功",
    "data": {
        "url": "http://localhost:8081/user/images/a20e491b_屏幕截图_2025-02-22_110739.png"
    },
    "token": null
}
```

#### 4.8.3获取-图片

- 地址GET`user/images/{imageName}`
- 参数
  - `imageName`
- 返回
  - `图片`

## 5.Q&A

### 5.1关于其他文档

本系统只是当前项目的分支，要去对应的模块看相应的文档


### 管理平台前端页面
智慧校园外卖平台代码位于仓库 <code>xiyanchenghong-waimai-master/xiyanchenghong-waimai-maanage</code> 文件夹下，采用Vue.js+Element UI+Webpack技术

部署方法：
Node.js <code>npm run build</code>
