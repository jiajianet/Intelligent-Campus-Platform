package cn.xiyanchenghong.waimai.bean.enumeration;

public enum ConfigKeyEnum {
    SYSTEM_FILE_UPLOAD_PATH("system.file.upload.path"),
    SYSTEM_APP_NAME("system.app.name"),
    SYSTEM_PLATFORM_TOTAL_AMOUNT("system.platform.total.amount"),
    API_TENCENT_MINI_PROGRAM_APPID("api.tencent.mini.program.appid"),
    API_TENCENT_MINI_PROGRAM_APPSECRET("api.tencent.mini.program.secret"),
    API_TENCENT_SMS_APPID("api.tencent.sms.appid"),
    API_TENCENT_SMS_APPKEY("api.tencent.sms.appkey"),
    API_TENCENT_SMS_SIGN("api.tencent.sms.sign");

    private String value;

    ConfigKeyEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
