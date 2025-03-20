package com.xiyanchenghong.backenduser.WebMvc;

import com.xiyanchenghong.backenduser.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

    @Bean
    public OncePerRequestFilter jwtFilter() {
        return new JwtFilter();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
                    @Override
                    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                        String token = request.getHeader("Authorization");
                        if (token != null && token.startsWith("Bearer ")) {
                            token = token.substring(7);
                            System.out.println("JWT Token: " + token); // 打印JWT字符串
                            if (token.chars().filter(ch -> ch == '.').count() == 2) {
                                try {
                                    Claims claims = JwtUtils.parseJwt(token);
                                    if (JwtUtils.isTokenExpired(token)) {
                                        logger.warn("Token expired for request: {} {}", request.getMethod(), request.getRequestURI());
                                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
                                        return false;
                                    }
                                    request.setAttribute("claims", claims);
                                    logger.info("Token validated for request: {} {}", request.getMethod(), request.getRequestURI());
                                } catch (Exception e) {
                                    logger.error("请求的令牌无效: {} {}", request.getMethod(), request.getRequestURI(), e);
                                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                                    return false;
                                }
                            } else {
                                logger.error("请求的令牌格式错误: {} {}", request.getMethod(), request.getRequestURI());
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Malformed token");
                                return false;
                            }
                        } else {
                            logger.warn("请求缺少令牌: {} {}", request.getMethod(), request.getRequestURI());
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token missing");
                            return false;
                        }
                        return true;
                    }

                    @Override
                    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
                        if (ex != null) {
                            logger.error("请求引发异常: {} {}", request.getMethod(), request.getRequestURI(), ex);
                        } else {
                            logger.info("请求已完成: {} {} with status {}", request.getMethod(), request.getRequestURI(), response.getStatus());
                        }
                    }
                }).addPathPatterns("/**") // 拦截所有请求
                .excludePathPatterns(
                        "/user/login",
                        "/user/register",
                        "/user/getUserInfo",
                        "/user/channels",
                        "/user/articles",
                        "/user/articles/{id}",
                        "/user/upload",
                        "/user/images/{imageName}",
                        "/captcha/get",
                        "/captcha/check",
                        "/user/forgotPassword",
                        "/user/resetPassword",
                        "/user/schools",
                        "/user/verifyEmail",
                        "/user/deleteAccount",
                        "/user/completeRegistration",
                        "/user/resetPasswordWithCaptcha",
                        "/user/completeDeleteAccount",
                        "/user/getUserScheduleList",
                        "/user/saveUserSchedule",
                        "/user/uploadAvatar",
                        "/user/logout",
                        "/user/updateEmail",
                        "/user/verifyEmailUpdate",
                        "/user/updateUserInfo",
                        "/course/getCourseList",
                        "/course/getCourseInfo",
                        "/course/joinCourse",
                        "/course/dropCourse",
                        "/course/verifyDropCourse",
                        "/course/deleteCourse",
                        "/course/createCourse",
                        "/course/getCourseListAll",
                        "/course/uploadCourseCover",
                        "/classroom/getClassroomInfo",
                        "/classroom/beginClassroom",
                        "/classroom/endClassroom",
                        "/classroom/modifyClassroom",
                        "/classroom/getStudents",
                        "/classroom/getOngoingClassrooms",
                        "/classroom/getRaisedHands",
                        "/classroom/raiseHand",
                        "/classroom/beginSignIn",
                        "/classroom/endSignIn",
                        "/student/getAssignmentInfo/{assignmentId}",
                        "/student/getAssignmentData/{assignmentId}",
                        "/student/submitAssignment",
                        "/student/getClassroomInfo",
                        "/student/joinClassroom",
                        "/student/getExaminfo/{examId}",
                        "/student/getExamData/{examId}",
                        "/student/updateLatestData/{examId}",
                        "/student/submitExam",
                        "/student/signIn",
                        "/teacher/addAssignment",
                        "/teacher/deleteAssignment/{assignmentId}",
                        "/teacher/modifyAssignment",
                        "/teacher/addExam",
                        "/teacher/deleteExam/{examId}",
                        "/teacher/modifyExam/{examId}",
                        "/school/getSchoolAddress"
                ); // 排除常用用户接口
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射 /images/** 到本地的 uploads 目录
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/"); // 确保图片目录能通过 HTTP 访问
    }
}