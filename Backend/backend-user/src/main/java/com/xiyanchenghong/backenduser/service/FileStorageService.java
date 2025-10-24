package com.xiyanchenghong.backenduser.service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface FileStorageService {
    String storeFile(MultipartFile file);

    boolean deleteFile(String fileName);

    Path loadFile(String fileName);
}
