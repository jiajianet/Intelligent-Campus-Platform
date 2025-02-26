import { createSlice } from '@reduxjs/toolkit'
import { removeToken } from '@/utils/token'
import { setToken as _setToken, getToken } from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'

const userStore = createSlice({
    name: 'user', // 数据状态
    initialState: {
        token: getToken() || '',//token的初始值，可以封装进函数里
        userInfo: {}
    }, // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    },
})


const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer
//异步方法登录
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        try {
            const res = await loginAPI(loginForm);
            const token = res.data.token;

            if (token) {
                dispatch(setToken(token));  // 确保返回 token
                return token;
            } else {
                console.error("登录响应中没有 token:", res);
                return null;
            }
        } catch (error) {
            console.error("登录请求出错：", error);
            return null;
        }
    };
};
//异步方法获取用户信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        try {
            const res = await getProfileAPI();

            if (res && res.data.data) {
                dispatch(setUserInfo(res.data.data));
            } else {
                console.error("响应中不包含用户信息:", res);
            }
        } catch (error) {
            console.error("获取用户信息请求出错：", error);
        }
    };
};

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer