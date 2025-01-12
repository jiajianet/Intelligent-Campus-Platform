package cn.xiyanchenghong.waimai.bean.vo.wechat;

import lombok.Data;

/**
 * 小程序用户信息
 */
@Data
public class MiniProgramUserInfo {
    private String openid;
    private String unionid;
    private Integer errcode;
    private String sessionKey;
    private String errmsg;
}
