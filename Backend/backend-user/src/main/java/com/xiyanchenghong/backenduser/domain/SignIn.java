package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class SignIn {
    private Long signInId;
    private Long classroomId;
    private Long teacherId;
    private Long studentId;
    private Date signInTime;
    private Boolean status;
}