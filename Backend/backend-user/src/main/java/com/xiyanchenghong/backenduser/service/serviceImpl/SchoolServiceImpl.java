package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.School;
import com.xiyanchenghong.backenduser.repository.SchoolRepository;
import com.xiyanchenghong.backenduser.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SchoolServiceImpl implements SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    @Override
    public School getSchoolByName(String name) {
        return schoolRepository.findByName(name);
    }
}