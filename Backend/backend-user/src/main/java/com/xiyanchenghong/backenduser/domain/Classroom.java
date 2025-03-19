package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Classroom {
    private Long classroomId;
    private Integer courseId;
    private Integer teacherId;
    private String classroomName;
    private Date startTime;
    private Date endTime;
}