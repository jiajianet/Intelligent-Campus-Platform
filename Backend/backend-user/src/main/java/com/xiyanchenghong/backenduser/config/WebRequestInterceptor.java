//package com.xiyanchenghong.backenduser.config;
//
//
//
//
//import org.springframework.web.servlet.HandlerInterceptor;
//import com.xiyanchenghong.backenduser.interceptor.RequestInterceptor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.task.SimpleAsyncTaskExecutor;
//import org.springframework.format.FormatterRegistry;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.HttpMessageConverter;
//import org.springframework.lang.Nullable;
//import org.springframework.validation.MessageCodesResolver;
//import org.springframework.validation.Validator;
//import org.springframework.web.method.support.HandlerMethodArgumentResolver;
//import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
//import org.springframework.web.servlet.HandlerExceptionResolver;
//import org.springframework.web.servlet.config.annotation.*;
//import java.util.List;
//
///**
// * 拦截器配置类（可用于跨域、token验证等）
// */
//@Configuration
//public class WebRequestInterceptor implements WebMvcConfigurer {
//
//    /**
//     * 添加自定义拦截器
//     * @param registry 拦截器注册器
//     */
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        // RequestInterceptor为具体拦截逻辑的执行类，实现了HandlerInterceptor接口
//        // addPathPatterns("/test/**") 表示/test路径下的所有请求都会被拦截
//        // excludePathPatterns("/test/exception") 表示/test/exception路径不会被拦截
//        registry.addInterceptor(new RequestInterceptor())
//                .addPathPatterns("/test/**")
//                .addPathPatterns("/test/queryUser")
//                .excludePathPatterns("/test/exception");
//    }
//
//    /**
//     * 配置跨域支持
//     * @param registry 跨域注册器
//     */
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowCredentials(true)
//                .allowedMethods("GET", "POST", "DELETE", "PUT")
//                .maxAge(3600 * 24);
//    }
//
//    /**
//     * 配置路径匹配
//     * @param configurer 路径匹配配置器
//     */
//    @Override
//    public void configurePathMatch(PathMatchConfigurer configurer) {
//        // 设置为true后，访问路径后加/也能正常访问，例如/user和/user/都能访问
//        configurer.setUseTrailingSlashMatch(true);
//    }
//
//    /**
//     * 配置内容协商机制
//     * @param configurer 内容协商配置器
//     */
//    @Override
//    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
//        configurer.favorPathExtension(true)
//                .favorParameter(false)
//                .ignoreAcceptHeader(true)
//                .useRegisteredExtensionsOnly(false)
//                .defaultContentType(MediaType.APPLICATION_JSON);
//    }
//
//    /**
//     * 配置异步支持
//     * @param configurer 异步支持配置器
//     */
//    @Override
//    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
//        // 设置默认超时时间为10秒
//        configurer.setDefaultTimeout(10000);
//        // 设置异步任务执行器
//        configurer.setTaskExecutor(new SimpleAsyncTaskExecutor());
//    }
//
//    /**
//     * 配置默认Servlet处理
//     * @param configurer 默认Servlet处理配置器
//     */
//    @Override
//    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
//        configurer.enable();
//    }
//
//    /**
//     * 添加格式化器或转换器
//     * @param registry 格式化器注册器
//     */
//    @Override
//    public void addFormatters(FormatterRegistry registry) {
//        // 在此添加自定义格式化器或转换器
//    }
//
//    /**
//     * 添加静态资源处理器
//     * @param registry 资源处理器注册器
//     */
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        // 配置Swagger UI的静态资源路径
//        registry.addResourceHandler("swagger-ui.html")
//                .addResourceLocations("classpath:/META-INF/resources/");
//        registry.addResourceHandler("/webjars/**")
//                .addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }
//
//    /**
//     * 添加视图控制器
//     * @param registry 视图控制器注册器
//     */
//    @Override
//    public void addViewControllers(ViewControllerRegistry registry) {
//        // 将/home路径映射到home视图
//        registry.addViewController("/home").setViewName("home");
//    }
//
//    /**
//     * 配置视图解析器
//     * @param registry 视图解析器注册器
//     */
//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
//        // 配置JSP视图解析器
//        registry.jsp("/WEB-INF/views/", ".jsp");
//    }
//
//    /**
//     * 添加自定义参数解析器
//     * @param resolvers 参数解析器列表
//     */
//    @Override
//    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//        // 在此添加自定义参数解析器
//    }
//
//    /**
//     * 添加自定义返回值处理器
//     * @param handlers 返回值处理器列表
//     */
//    @Override
//    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
//        // 在此添加自定义返回值处理器
//    }
//
//    /**
//     * 配置消息转换器
//     * @param converters 消息转换器列表
//     */
//    @Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        // 在此添加自定义消息转换器
//    }
//
//    /**
//     * 扩展消息转换器
//     * @param converters 消息转换器列表
//     */
//    @Override
//    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
//        // 在此扩展消息转换器
//    }
//
//    /**
//     * 配置异常处理器
//     * @param resolvers 异常处理器列表
//     */
//    @Override
//    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
//        // 在此添加自定义异常处理器
//    }
//
//    /**
//     * 扩展异常处理器
//     * @param resolvers 异常处理器列表
//     */
//    @Override
//    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
//        // 在此扩展异常处理器
//    }
//
//    @Nullable
//    @Override
//    public Validator getValidator() {
//        return null;
//    }
//
//    @Nullable
//    @Override
//    public MessageCodesResolver getMessageCodesResolver() {
//        return null;
//    }
//}
