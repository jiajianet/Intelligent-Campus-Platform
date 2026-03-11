package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileService {
    List<Map<String, Object>> uploadFiles(MultipartFile[] files);
    List<FileEntity> getAllDoneFiles();
    void reorderFiles(List<String> uids);
    void deleteFiles(String uid);
}
