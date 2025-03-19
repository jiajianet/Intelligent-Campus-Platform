package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Exam {
    private Long id;
    private Long teacherId;
    private String title;
    private String description;
    private Date examDate;
}