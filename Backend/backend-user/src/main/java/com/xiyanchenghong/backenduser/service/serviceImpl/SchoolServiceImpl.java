package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.School;
import com.xiyanchenghong.backenduser.mapper.SchoolMapper;
import com.xiyanchenghong.backenduser.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SchoolServiceImpl implements SchoolService {

    @Autowired
    private SchoolMapper schoolMapper;

    @Override
    public School getSchoolByName(String name) {
        return schoolMapper.findByName(name);
    }
}