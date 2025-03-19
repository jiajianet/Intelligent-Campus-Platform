package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ExamSubmission {
    private Long id;
    private Long examId;
    private Long studentId;
    private String submissionData;
    private Date submissionDate;
}