package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.User;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course getCourseById(Long courseId);
    boolean joinCourse(Long userId, Long courseId);
    boolean dropCourse(Long userId, Long courseId);
    Course createCourse(Course course);
    boolean deleteCourse(Long courseId);
    void updateCourse(Course course);
    List<Course> getCoursesByTeacherId(Long teacherId);
    List<Course> getCoursesByStudentId(Long studentId);
    List<Course> getAvailableCourses(Long studentId);
    List<User> getStudentsByCourseId(Long courseId); // 新增的方法
    User getTeacherById(Long teacherId);
}