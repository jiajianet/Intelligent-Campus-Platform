package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.domain.User;

import java.util.List;

public interface ClassroomService {

    Classroom getClassroomInfo(Long userId);

    Classroom beginClassroom(Classroom classroom);

    Classroom endClassroom(Classroom classroom);

    Classroom modifyClassroom(Classroom classroom);

    List<ClassroomStudent> getStudents(Long classroomId);

    ClassroomStudent joinClassroom(ClassroomStudent classroomStudent);

    List<Classroom> getOngoingClassrooms();

    void raiseHand(Long studentId);

    List<User> getRaisedHands(Long classroomId);
}