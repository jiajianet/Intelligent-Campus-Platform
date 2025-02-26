//组合redux子模块+到处store实例

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;