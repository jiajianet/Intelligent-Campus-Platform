package com.xiyanchenghong.backenduser.model;

public enum ResponseCodeEnum {
    INVALID_REQUEST(400),
    TOO_MANY_REQUESTS(429),
    REQUEST_FAILED(500);
    // 其他枚举值

    private final int code;

    ResponseCodeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
