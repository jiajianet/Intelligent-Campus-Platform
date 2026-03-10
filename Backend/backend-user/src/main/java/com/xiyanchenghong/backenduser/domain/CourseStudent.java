package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CourseStudent {
    private Long id;
    private Long studentId;
    private Long courseId;
    private Date joinDate;
}