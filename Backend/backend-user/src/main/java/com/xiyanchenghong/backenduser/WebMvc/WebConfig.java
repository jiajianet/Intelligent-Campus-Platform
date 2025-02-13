package com.xiyanchenghong.backenduser.WebMvc;
import com.xiyanchenghong.backenduser.WebMvc.JwtFilter;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

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
                        if (token != null) {
                            try {
                                Claims claims = JwtUtils.parseJwt(token);
                                if (JwtUtils.isTokenExpired(token)) {
                                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
                                    return false;
                                }
                                request.setAttribute("claims", claims);
                            } catch (Exception e) {
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                                return false;
                            }
                        } else {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token missing");
                            return false;
                        }
                        return true;
                    }
                }).addPathPatterns("/**") // 拦截所有请求
                .excludePathPatterns(
                        "/user/login",
                        "/user/register",
                        "/user/getUserInfo",
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
                        "/classroom/getClassroomInfo",
                        "/classroom/beginClassroom",
                        "/classroom/endClassroom",
                        "/classroom/modifyClassroom",
                        "/classroom/getStudents",
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
                        "/teacher/beginSignIn",
                        "/teacher/endSignIn",
                        "/school/getSchoolAddress"
                ); // 排除常用用户接口
    }
}
