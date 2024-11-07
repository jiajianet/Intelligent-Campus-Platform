package com.xiyanchenghong.backenduser.model;
import lombok.Data;

/**
 * @RequestLock注解定义了几个基础的属性，redis锁前缀、redis锁时间、redis锁时间单位、key分隔符。
 * 其中前面三个参数比较好理解，都是一个锁的基本信息。
 * key分隔符是用来将多个参数合并在一起的，比如userName是张三，userPhone是123456，那么完整的key就是"张三&123456"，
 * 最后再加上redis锁前缀，就组成了一个唯一key
 */

@Data
public class RequestLock1 {
    /**
     * 用户学号
     */
    private String uno;
    /**
     * 用户密码
     */
    private String password;

}