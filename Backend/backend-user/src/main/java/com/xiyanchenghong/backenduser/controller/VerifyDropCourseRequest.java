package com.xiyanchenghong.backenduser.controller;

public class VerifyDropCourseRequest {
    private Long courseId;
    private String verificationCode;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}