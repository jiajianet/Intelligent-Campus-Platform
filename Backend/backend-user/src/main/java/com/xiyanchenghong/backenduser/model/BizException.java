package com.xiyanchenghong.backenduser.model;

public class BizException extends RuntimeException {
    private final ResponseCodeEnum code;

    public BizException(ResponseCodeEnum code, String message) {
        super(message);
        this.code = code;
    }

    public ResponseCodeEnum getCode() {
        return code;
    }
}