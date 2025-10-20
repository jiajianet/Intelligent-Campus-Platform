package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);

            //不存在则创建文件夹
            if (!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }

            //生产唯一文件名
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            //保存
            Files.copy(file.getInputStream(), filePath);

            return fileName;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
}
