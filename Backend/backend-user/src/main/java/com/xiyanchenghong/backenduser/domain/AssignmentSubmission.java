package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AssignmentSubmission {
    private Long id;
    private Long assignmentId;
    private Long studentId;
    private String content;
    private Date submissionDate;
}