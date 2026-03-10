package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.CourseStudent;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface CourseStudentMapper {

    CourseStudent getCourseStudentById(Long id);

    List<CourseStudent> getAllCourseStudents();

    List<CourseStudent> getCourseStudentsByStudentId(Long studentId);

    List<CourseStudent> getCourseStudentsByCourseId(Long courseId);

    CourseStudent getCourseStudentByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    void insertCourseStudent(CourseStudent courseStudent);

    void updateCourseStudent(CourseStudent courseStudent);

    void deleteCourseStudent(Long id);

    void deleteCourseStudentByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
}