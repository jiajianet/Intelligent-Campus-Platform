package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.repository.ClassroomRepository;
import com.xiyanchenghong.backenduser.repository.ClassroomStudentRepository;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private ClassroomStudentRepository classroomStudentRepository;

    @Override
    public Classroom getClassroomInfo(Long userId) {
        return classroomRepository.findByTeacherId(userId);
    }

    @Override
    public Classroom beginClassroom(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    @Override
    public Classroom endClassroom(Classroom classroom) {
        // 更新教室记录
        Classroom existingClassroom = classroomRepository.findById(classroom.getClassroomId()).orElse(null);
        if (existingClassroom != null) {
            existingClassroom.setEndTime(classroom.getEndTime());
            return classroomRepository.save(existingClassroom);
        }
        return null;
    }

    @Override
    public Classroom modifyClassroom(Classroom classroom) {
        // 修改教室记录
        Classroom existingClassroom = classroomRepository.findById(classroom.getClassroomId()).orElse(null);
        if (existingClassroom != null) {
            existingClassroom.setCourseId(classroom.getCourseId());
            existingClassroom.setClassroomName(classroom.getClassroomName());
            existingClassroom.setLocation(classroom.getLocation());
            existingClassroom.setStartTime(classroom.getStartTime());
            existingClassroom.setEndTime(classroom.getEndTime());
            return classroomRepository.save(existingClassroom);
        }
        return null;
    }

    @Override
    public List<ClassroomStudent> getStudents(Long classroomId) {
        return classroomStudentRepository.findByClassroomId(classroomId);
    }

    @Override
    public ClassroomStudent joinClassroom(ClassroomStudent classroomStudent) {
        return classroomStudentRepository.save(classroomStudent);
    }
}