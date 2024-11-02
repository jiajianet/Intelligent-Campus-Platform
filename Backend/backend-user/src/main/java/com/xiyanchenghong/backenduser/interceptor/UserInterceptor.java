package com.xiyanchenghong.backenduser.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/*
* 用户的拦截器
* */

@Component //不是业务、服务、数据层
public class UserInterceptor implements HandlerInterceptor {
    @Override //true放行，false拦截
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获得请求路径
        String url = request.getRequestURL().toString();
        //判断资源路径,如果是登录则不拦截,我也没搞清楚注册判断放这里还是UesrConfig，但是放这里可能会导致一些不必要的错误
        if (url.contains("login")) {
            return true;
        }

        //获得请求头token，返回的就是前端携带过来的令牌
        String jwt = request.getHeader("token");
        if (jwt == null) {
//            返回登录界面，这里我不知道规范是什么，于是就随便写了
            Result notLogin = Result.error("1","NOT_LOGIN");
            //使用原始方法进行给客户端响应的数据
            //把notlogin对象转换成json字符串返回
            String jsonString = JSONObject.toJSONString(notLogin);
            //格式自定义
            response.getWriter().write(jsonString);
            return false;

        }
        //解析令牌
        try{
            JwtUtils.parseJwt(jwt);
        }catch (Exception e){
            //令牌有问题，返回登录界面
            Result notLogin = Result.error("1","NOT_LOGIN");
            //给客户端响应数据，转成字符串返回
            String jsonString = JSONObject.toJSONString(notLogin);
            //和前端对接代码
            response.getWriter().write(jsonString);
            return false;
        }
        //令牌验证成功
        return true;

    }
    //这两个功能没影响，但是因为接口的默认方法；所以要重写
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        //这两个功能没影响，但是因为接口；所以要重写
        System.out.println("postHandle");
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
}
