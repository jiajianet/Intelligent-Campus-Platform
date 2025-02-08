package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Course;
import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    boolean joinCourse(Long userId, Long courseId);
    Course getCourseById(Long courseId);
    boolean dropCourse(Long userId, Long courseId);
}