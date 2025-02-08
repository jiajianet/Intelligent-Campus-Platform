package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.CourseStudent;
import com.xiyanchenghong.backenduser.repository.CourseRepository;
import com.xiyanchenghong.backenduser.repository.CourseStudentRepository;
import com.xiyanchenghong.backenduser.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseStudentRepository courseStudentRepository;

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
            CourseStudent courseStudent = new CourseStudent();
            courseStudent.setStudentId(userId);
            courseStudent.setCourseId(courseId);
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
            CourseStudent courseStudent = courseStudentRepository.findByStudentIdAndCourseId(userId, courseId);
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
}