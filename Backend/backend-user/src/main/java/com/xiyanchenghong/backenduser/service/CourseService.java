package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.User;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    boolean joinCourse(Long userId, Long courseId);
    Course getCourseById(Long courseId);
    boolean dropCourse(Long userId, Long courseId);
    Course createCourse(Course course);
    boolean deleteCourse(Long courseId);
    void updateCourse(Course course);
    User getTeacherById(Long teacherId); // 新增方法
}