package com.xiyanchenghong.backenduser.domain;
//domain中的User.java
//import jakarta.persistence.Entity;
//import jakarta.persistence.Table;
//import jakarta.persistence.Id;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
@Table(name = "user")
@Entity
public class User {
    // 注意属性名要与数据表中的字段名一致
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 主键自增int(10)对应long
    private long uid;
    // 学校属性varchar对应String
    private String uschool;
    // 用户名属性varchar对应String
    private String uno;
    // 密码属性varchar对应String
    private String password;

    public String getUschool() {
        return uschool;
    }

    public void setUschool(String uschool) {
        this.uschool = uschool;
    }

    public long getUid() {
        return uid;
    }

    public void setUid(long uid) {
        this.uid = uid;
    }

    public String getUno() {
        return uno;
    }

    public void setUno(String uno) {
        this.uno = uno;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}