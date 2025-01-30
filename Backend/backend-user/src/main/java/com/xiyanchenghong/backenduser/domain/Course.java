package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;

    private String courseName;
    private String courseDescription;
    private Integer teacherId;
    private Date startDate;
    private Date endDate;

    // Getters and Setters
}