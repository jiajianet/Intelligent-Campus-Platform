package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Assignment {
    private Long assignmentId;
    private Long teacherId;
    private Long classroomId;
    private String title;
    private String description;
    private Date dueDate;
}