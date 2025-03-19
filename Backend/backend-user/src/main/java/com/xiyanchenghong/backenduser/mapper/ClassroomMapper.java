package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.Classroom;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ClassroomMapper {

    Classroom getClassroomById(Long classroomId);

    List<Classroom> getAllClassrooms();

    Classroom getClassroomByTeacherId(Long teacherId);

    List<Classroom> getOngoingClassrooms();

    List<Classroom> getOngoingClassroomsByTeacherId(Long teacherId);

    void insertClassroom(Classroom classroom);

    void updateClassroom(Classroom classroom);

    void deleteClassroom(Long classroomId);
}