package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private long uid;
    private String uschool;
    private String uno;
    private String password;
    private String uname;
    private String email;
    private String upic;
    private boolean emailverified;
    private String schedfile;
    private Role role;

    public String getName() {
        return uname;
    }

    public boolean isEmailVerified() {
        return emailverified;
    }

    public void setEmailVerified(boolean emailverified) {
        this.emailverified = emailverified;
    }

    public enum Role {
        STUDENT,
        TEACHER
    }


}