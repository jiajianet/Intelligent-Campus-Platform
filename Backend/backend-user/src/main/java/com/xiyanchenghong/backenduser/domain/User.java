package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.*;

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

    @Enumerated(EnumType.STRING)
    private Role role;

    @PrePersist
    public void prePersist() {
        if (this.role == null) {
            this.role = Role.STUDENT;
        }
    }

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

    public void setEmailVerified(boolean emailverified) {
        this.emailverified = emailverified;
    }

    public String getSchedfile() {
        return schedfile;
    }

    public void setSchedfile(String schedfile) {
        this.schedfile = schedfile;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // 新增 getName 方法
    public String getName() {
        return uname;
    }

    public enum Role {
        STUDENT,
        TEACHER
    }
}