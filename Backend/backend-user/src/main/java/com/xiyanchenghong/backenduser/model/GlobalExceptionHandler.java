package com.xiyanchenghong.backenduser.model;

import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BizException.class)
    public ResponseEntity<Result<?>> handleBizException(BizException ex) {
        // 创建标准的API响应
        Result<?> result = Result.error(ex.getCode().name(), ex.getMessage());
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    // 其他异常处理方法
}
