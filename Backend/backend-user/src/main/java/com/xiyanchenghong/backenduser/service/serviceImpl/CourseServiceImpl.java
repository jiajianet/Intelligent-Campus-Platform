package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.CourseStudent;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.repository.CourseRepository;
import com.xiyanchenghong.backenduser.repository.CourseStudentRepository;
import com.xiyanchenghong.backenduser.repository.UserRepository;
import com.xiyanchenghong.backenduser.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseStudentRepository courseStudentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    @Override
    public boolean joinCourse(Long userId, Long courseId) {
        try {
            Course course = courseRepository.findById(courseId).orElse(null);
            if (course == null) {
                return false;
            }
            CourseStudent courseStudent = new CourseStudent();
            courseStudent.setStudentId(userId);
            courseStudent.setCourse(course);
            courseStudent.setJoinDate(new Date());
            courseStudentRepository.save(courseStudent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean dropCourse(Long userId, Long courseId) {
        try {
            CourseStudent courseStudent = courseStudentRepository.findByStudentIdAndCourse_CourseId(userId, courseId);
            if (courseStudent != null) {
                courseStudentRepository.delete(courseStudent);
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
        return courseRepository.save(course);
    }

    @Override
    public boolean deleteCourse(Long courseId) {
        try {
            courseRepository.deleteById(courseId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void updateCourse(Course course) {
        courseRepository.save(course);
    }

    @Override
    public List<Course> getCoursesByTeacherId(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    @Override
    public List<Course> getCoursesByStudentId(Long studentId) {
        List<CourseStudent> courseStudents = courseStudentRepository.findByStudentId(studentId);
        return courseStudents.stream()
                .map(CourseStudent::getCourse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Course> getAvailableCourses(Long studentId) {
        List<Course> allCourses = courseRepository.findAll();
        List<Course> enrolledCourses = getCoursesByStudentId(studentId);
        return allCourses.stream()
                .filter(course -> !enrolledCourses.contains(course))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getStudentsByCourseId(Long courseId) {
        return courseStudentRepository.findByCourse_CourseId(courseId).stream()
                .map(courseStudent -> userRepository.findById(courseStudent.getStudentId()).orElse(null))
                .collect(Collectors.toList());
    }

    @Override
    public User getTeacherById(Long teacherId) {
        return userRepository.findById(teacherId).orElse(null);
    }
}