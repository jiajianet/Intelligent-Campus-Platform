//封装高阶组件，实现权限控制
//有token，则放行，没有token，则跳转到登录页面
import { Navigate } from 'react-router-dom';
import { getToken } from '@/utils/token';

const AuthRoute = ({ children }) => {
    const token = getToken();
    if (token) {
        return <>{children}</>; //有token，则放行

    } else {
        return <Navigate to="/login" replace />; //没有token，则跳转到登录页面
    }
}

export default AuthRoute;


