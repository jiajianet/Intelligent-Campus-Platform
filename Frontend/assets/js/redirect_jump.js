function setRedirect(url) {
    setTimeout(function (){
        window.location.href = url+"?redirect="+window.location.href;
    },2000)

}

function getUrlDataFN(urlStr) {
    // 定义一个空对象以储存数据
    const urlObj = {}
    // 检查url中是否携带数据
    if (urlStr.indexOf('?') === -1) return null
    // 找到 '?' 对应的下标
    const index = urlStr.indexOf('?') // index = 31
    // 截取 '?' 后的内容
    const dataStr = urlStr.substr(index + 1) // dataStr = a=1&b=2&c=&d=xxx&e
    // 通过 '&' 将字符串分割成数组
    const dataArr = dataStr.split('&') // ['a=1', 'b=2', 'c=', 'd=xxx', 'e']
    // 遍历字符串分割后的数组
    dataArr.forEach(str => {
        // 判断数组内的字符串是否有 '='
        if (str.indexOf('=') === -1) {
            // 如没有 '=' , 则将此字符串作为对象内键值对的键, 键值对的值为 undefined
            urlObj[str] = undefined // { e: undefined }
        } else {
            // 如果有 '='
            // 通过 '=' 将此字符串截取成两段字符串（不推荐使用 split 分割, 因为数据中可能携带多个 '=' ）
            const innerArrIndex = str.indexOf('=')
            const key = str.substring(0, innerArrIndex)
            const value = str.substr(innerArrIndex + 1)
            // 以截取后的两段字符串作为对象的键值对
            urlObj[key] = value // {a: '1', b: '2', c: '', d: 'xxx'}
        }
    })
    // 返回对象
    return urlObj
}

function redirect() {
    let redirectObj = getUrlDataFN(window.location.href)
    if (redirectObj) {
        setTimeout(function (){
            window.location.href = redirectObj.redirect;
        },2000)
    }else{
        setTimeout(function (){
            window.location.href = "http://111.230.253.94"
        },2000)
    }
}
