package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Course {
    private Long courseId;
    private String courseName;
    private String courseDescription;
    private Long teacherId;
    private Date startDate;
    private Date endDate;
    private int progress;
    private String coverImagePath;
}