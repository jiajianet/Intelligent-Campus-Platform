package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageServiceImpl.class);

    @Value("${file.upload-dir}")
    private String uploadDir;

    //保存文件
    @Override
    public String storeFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);

            //不存在则创建文件夹
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            //生产唯一文件名
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            //保存
            Files.copy(file.getInputStream(), filePath);

            return fileName;
        } catch (IOException e) {
            logger.error("文件保存失败", e);
            return null;
        }

    }

    //删除文件
    @Override
    public boolean deleteFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            return Files.deleteIfExists(filePath);

        } catch (IOException e) {
            logger.error("文件删除失败：{}", fileName, e);
            return false;
        }
    }

    //加载文件
    @Override
    public Path loadFile(String fileName) {
        Path uploadPath = Paths.get(uploadDir);
        try {

            Path resolvedPath = uploadPath.resolve(fileName);
            //清理冗余路径元素（如 . 和 ..）
            Path normalizedPath = resolvedPath.normalize();

            if (!normalizedPath.startsWith(uploadPath)) {
                logger.error("文件访问失败，检测到路径遍历企图。请求的文件名：{}", fileName);
                throw new SecurityException("非法的文件路径访问：" + fileName);
            }

            return normalizedPath;

        } catch (SecurityException e) {
            //捕捉到我们自己抛出的安全异常，重新抛出或者按需处理
            logger.error("加载文件时发生未知错误，文件名：{}", fileName, e);
            throw e;
        } catch (Exception e) {
            logger.error("加载文件时发生未知错误，文件名：{}", fileName, e);
            //抛出一个更通用的运行时异常
            throw new RuntimeException("文件加载失败，请检查文件名",e);
        }
    }
}
