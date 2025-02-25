package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class ExamSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long examId;
    private Long studentId;
    private String submissionData;
    private Date submissionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getSubmissionData() {
        return submissionData;
    }

    public void setSubmissionData(String submissionData) {
        this.submissionData = submissionData;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }
}