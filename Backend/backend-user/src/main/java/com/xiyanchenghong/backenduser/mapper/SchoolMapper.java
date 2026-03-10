package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.School;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface SchoolMapper {

    School getSchoolById(Long id);

    List<School> getAllSchools();

    List<School> getSchoolsByNameContaining(String name);

    School getSchoolByName(String name);

    void insertSchool(School school);

    void updateSchool(School school);

    void deleteSchool(Long id);

    School findByName(@Param("name") String name);
}