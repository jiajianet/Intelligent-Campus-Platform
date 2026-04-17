package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import com.xiyanchenghong.backenduser.service.FileService;
import com.xiyanchenghong.backenduser.service.FileStorageService;
import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@RestController
@RequestMapping("/user/files")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    private final FileStorageService fileStorageService;
    private final FileService fileService;

    @Autowired
    public FileController(FileStorageService fileStorageService, FileService fileService) {
        this.fileStorageService = fileStorageService;
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public Result<List<Map<String, Object>>> uploadFile(@RequestParam("file") MultipartFile[] files) {
        return Result.success(fileService.uploadFiles(files));
    }

    @GetMapping("/upload/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        logger.info("访问文件资源: {}", fileName);
        Resource resource;
        try {
            Path filePath = fileStorageService.loadFile(fileName);

            if (!Files.exists(filePath)) {
                logger.warn("文件不存在: {}", fileName);
                //文件不存在，返回404
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            //将 Path 转换为 Spring 的 Resource
            resource = new UrlResource(filePath.toUri());

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            //对文件名进行 URL 编码
            String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
                    .replace("\\+", "%20");

            //构建 Content-Disposition 头部，使用 filename*(filename*: 遵循 RFC 5987，支持 UTF-8) 字段支持 UTF-8
            // (filename: 兼容旧浏览器，但可能乱码（Tomcat 会移除，但我们保留它的结构）)
            //TODO:可以考虑双重方案，让老旧的浏览器支持 filename* 的浏览器
            String contentDisposition = "inline; filename*=utf-8''" + encodedFileName;

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    // Content-Disposition: 'inline' 表示浏览器应尝试直接显示文件
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(resource);

        } catch (MalformedURLException e) {
            //捕获道路路径便利攻击或者非法访问（来自 service.loadFile)
            logger.error("非法文件访问尝试：{}", fileName, e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();// 403 Forbidden

        } catch (IOException e) {
            //捕获 IO 错误或者资源加载错误
            logger.error("文件资源房屋内失败：{}", fileName, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();// 500 Internal Server Error
        }

    }

    @GetMapping("/getFiles")
    public Result<List<FileEntity>> getFiles() {
        return Result.success(fileService.getAllDoneFiles());
    }

    @PutMapping("/reorder")
    public Result<String> reorderFiles(@RequestBody List<String> uids) {
        fileService.reorderFiles(uids);
        return Result.success("文件顺序已更新");
    }

    //TODO可能会重复（概率小）？
    @DeleteMapping("/delete/{uid}")
    public Result<String> deleteFile(@PathVariable String uid) {
        fileService.deleteFiles(uid);
        return Result.success("文件已删除");
    }

}
