package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Course;
import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    boolean joinCourse(Long userId, Integer courseId);
    Course getCourseById(Integer courseId);
    boolean dropCourse(Long userId, Integer courseId);
}