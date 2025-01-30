package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.*;

import javax.management.relation.Role;

@Table(name = "user")
@Entity
public class User {
    // 注意属性名要与数据表中的字段名一致
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主键
    private long uid;

    private String uschool;
    private String uno;
    private String password;
    private String uname;
    private String email;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '/www/jars/avatars/default_avatar.png'")
    private String upic; // 新增字段

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean emailverified;

    @Column(name = "schedfile")
    private String schedfile;

    private Role role;
    public long getUid() {
        return uid;
    }

    public void setUid(long uid) {
        this.uid = uid;
    }

    public String getUschool() {
        return uschool;
    }

    public void setUschool(String uschool) {
        this.uschool = uschool;
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

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUpic() {
        return upic;
    }

    public void setUpic(String upic) {
        this.upic = upic;
    }

    public boolean isEmailVerified() {
        return emailverified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailverified = emailVerified;
    }

    public String getSchedfile() {
        return schedfile;
    }

    public void setSchedfile(String schedfile) {
        this.schedfile = schedfile;
    }

    public enum Role {
        TEACHER,
        STUDENT
    }
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
