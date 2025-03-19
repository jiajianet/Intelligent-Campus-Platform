package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ClassroomStudentMapper {

    ClassroomStudent getClassroomStudentById(Long id);

    List<ClassroomStudent> getAllClassroomStudents();

    List<ClassroomStudent> getStudentsByClassroomId(Long classroomId);

    ClassroomStudent getClassroomStudentByStudentId(Long studentId);

    List<ClassroomStudent> getStudentsByClassroomIdAndHandRaisedTrue(Long classroomId);

    List<Classroom> getOngoingClassroomsByStudentId(Long studentId);

    ClassroomStudent getRaisedHandsByStudentId(Long studentId);

    void updateClassroomStudentHandRaised(@Param("studentId") Long studentId, @Param("handRaised") boolean handRaised);

    void insertClassroomStudent(ClassroomStudent classroomStudent);

    void updateClassroomStudent(ClassroomStudent classroomStudent);

    void deleteClassroomStudent(Long id);
}