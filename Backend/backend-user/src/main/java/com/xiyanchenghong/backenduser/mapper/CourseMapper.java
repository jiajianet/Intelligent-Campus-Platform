package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.Course;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface CourseMapper {

    Course getCourseById(Long courseId);

    List<Course> getAllCourses();

    List<Course> getCoursesByTeacherId(Long teacherId);

    void insertCourse(Course course);

    void updateCourse(Course course);

    void deleteCourse(Long courseId);
}