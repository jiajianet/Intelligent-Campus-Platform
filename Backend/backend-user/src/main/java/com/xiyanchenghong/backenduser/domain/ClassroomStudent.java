package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassroomStudent {
    private Long id;
    private Long classroomId;
    private Long studentId;
    private boolean handRaised;
}