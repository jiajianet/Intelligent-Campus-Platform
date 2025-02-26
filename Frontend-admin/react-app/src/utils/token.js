//封装token的获取和存储和删除

const TOKENKEY = 'token';

function setToken(token) {
    localStorage.setItem(TOKENKEY, token);
}

function getToken() {
    return localStorage.getItem(TOKENKEY);
}

function removeToken() {
    localStorage.removeItem(TOKENKEY);
}

export { setToken, getToken, removeToken };