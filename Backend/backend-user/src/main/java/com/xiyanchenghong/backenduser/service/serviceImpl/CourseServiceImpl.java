package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.CourseStudent;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.mapper.CourseMapper;
import com.xiyanchenghong.backenduser.mapper.CourseStudentMapper;
import com.xiyanchenghong.backenduser.mapper.UserMapper;
import com.xiyanchenghong.backenduser.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private CourseStudentMapper courseStudentMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Course> getAllCourses() {
        return courseMapper.getAllCourses();
    }

    @Override
    public Course getCourseById(Long courseId) {
        return courseMapper.getCourseById(courseId);
    }

    @Override
    public boolean joinCourse(Long userId, Long courseId) {
        try {
            Course course = courseMapper.getCourseById(courseId);
            if (course == null) {
                return false;
            }
            CourseStudent courseStudent = new CourseStudent();
            courseStudent.setStudentId(userId);
            courseStudent.setCourseId(courseId);
            courseStudent.setJoinDate(new Date());
            courseStudentMapper.insertCourseStudent(courseStudent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean dropCourse(Long userId, Long courseId) {
        try {
            CourseStudent courseStudent = courseStudentMapper.getCourseStudentByStudentIdAndCourseId(userId, courseId);
            if (courseStudent != null) {
                courseStudentMapper.deleteCourseStudentByStudentIdAndCourseId(userId, courseId);
                return true;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Course createCourse(Course course) {
        courseMapper.insertCourse(course);
        return course;
    }

    @Override
    public boolean deleteCourse(Long courseId) {
        try {
            courseMapper.deleteCourse(courseId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void updateCourse(Course course) {
        courseMapper.updateCourse(course);
    }

    @Override
    public List<Course> getCoursesByTeacherId(Long teacherId) {
        return courseMapper.getCoursesByTeacherId(teacherId);
    }

    @Override
    public List<Course> getCoursesByStudentId(Long studentId) {
        List<CourseStudent> courseStudents = courseStudentMapper.getCourseStudentsByStudentId(studentId);
        return courseStudents.stream()
                .map(courseStudent -> courseMapper.getCourseById(courseStudent.getCourseId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Course> getAvailableCourses(Long studentId) {
        List<Course> allCourses = courseMapper.getAllCourses();
        List<Course> enrolledCourses = getCoursesByStudentId(studentId);
        return allCourses.stream()
                .filter(course -> !enrolledCourses.contains(course))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getStudentsByCourseId(Long courseId) {
        return courseStudentMapper.getCourseStudentsByCourseId(courseId).stream()
                .map(courseStudent -> userMapper.getUserById(courseStudent.getStudentId()))
                .collect(Collectors.toList());
    }

    @Override
    public User getTeacherById(Long teacherId) {
        return userMapper.getUserById(teacherId);
    }
}