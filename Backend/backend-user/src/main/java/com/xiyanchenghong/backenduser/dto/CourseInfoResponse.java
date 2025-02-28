package com.xiyanchenghong.backenduser.dto;

import com.xiyanchenghong.backenduser.domain.Course;

import java.util.Date;

public class CourseInfoResponse {
    private Long courseId;
    private String courseName;
    private String courseDescription;
    private Long teacherId;
    private String teacherName;
    private String coverImageBase64;
    private Date startDate;
    private Date endDate;
    private int progress;

    public CourseInfoResponse(Course course, String coverImageBase64, String teacherName) {
        this.courseId = course.getCourseId();
        this.courseName = course.getCourseName();
        this.courseDescription = course.getCourseDescription();
        this.teacherId = course.getTeacherId();
        this.teacherName = teacherName;
        this.startDate = course.getStartDate();
        this.endDate = course.getEndDate();
        this.progress = course.getProgress();
        this.coverImageBase64 = coverImageBase64;
    }

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getCoverImageBase64() {
        return coverImageBase64;
    }

    public void setCoverImageBase64(String coverImageBase64) {
        this.coverImageBase64 = coverImageBase64;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}