package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamData {
    private Long id;
    private Long examId;
    private Long studentId;
    private String data;
}