package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import com.xiyanchenghong.backenduser.mapper.FileMapper;
import com.xiyanchenghong.backenduser.service.FileStorageService;
import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${file.base-url}")
    private String fileBaseUrl;

    private final FileMapper fileMapper;
    private final FileStorageService fileStorageService;

    @Autowired
    public FileController(FileStorageService fileStorageService, FileMapper fileMapper) {
        this.fileMapper = fileMapper;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Result<List<Map<String, Object>>>> uploadFile(@RequestParam("file") MultipartFile[] files) {
        logger.info("开始处理文件上传请求，文件数量: {}", files.length);
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (MultipartFile file : files) {
            Map<String, Object> response = new HashMap<>();
            String uid = UUID.randomUUID().toString();

            try {
                logger.debug("处理文件: {}", file.getOriginalFilename());
                String fileName = fileStorageService.storeFile(file);

                String fileUrl = fileBaseUrl + fileName;

                //找到当前最大sortOrder，然后+1
                Integer maxIndex = fileMapper.findMaxSortOrder();
                int newIndex = (maxIndex == null) ? 0 : maxIndex + 1;

                FileEntity fileEntity = new FileEntity();
                fileEntity.setUid(uid);
                fileEntity.setName(file.getOriginalFilename());
                fileEntity.setStatus("done");
                fileEntity.setUrl(fileUrl);
                fileEntity.setThumbUrl(fileUrl);
                fileEntity.setType(file.getContentType());
                fileEntity.setSize(file.getSize());
                fileEntity.setSortOrder(newIndex);

                fileMapper.insert(fileEntity);

                response.put("uid", uid);
                response.put("name", file.getOriginalFilename());
                response.put("url", fileBaseUrl);
                response.put("thumbUrl", fileBaseUrl);
                response.put("percent", 100);
                response.put("size", file.getSize());

                logger.info("文件上传成功： {}", fileUrl);
            } catch (Exception e) {
                logger.error("文件上传失败: {}", file.getOriginalFilename(), e);

                response.put("uid", uid);
                response.put("name", file.getOriginalFilename());
                response.put("status", "error");
                response.put("percent", 0);
            }

            responseList.add(response);
        }
        logger.info("文件上传处理完成，成功数量: {}", responseList.stream().filter(r -> !r.containsKey("status")).count());
        return ResponseEntity.ok(Result.success(responseList));
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
    public ResponseEntity<Result<List<FileEntity>>> getFiles() {
        logger.debug("查询所以状态为done的文件");
        List<FileEntity> files = fileMapper.findByStatusOrderBySortOrderAsc("done");
        logger.info("查询到{}个有效文件", files.size());
        return ResponseEntity.ok(Result.success(files));
    }

    @PutMapping("/reorder")
    public ResponseEntity<Result<String>> reorderFiles(@RequestBody List<String> uids) {
        logger.info("开始重排文件顺序，收到{}个文件ID", uids.size());
//        MyBatis 的更新是直接修改数据库
        for (int i = 0; i < uids.size(); i++) {
            fileMapper.updateSortOrder(uids.get(i), i); //i是最新的sortOrder
        }
        logger.info("文件顺序重排完成");
        return ResponseEntity.ok(Result.success("文件顺序已更新"));
    }

    //TODO可能会重复（概率小）？
    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<Object> deleteFile(@PathVariable String uid) {
        logger.info("开始执行删除流程，UID：{}", uid);
        // MyBatis 根基UID查找
        FileEntity fileEntity = fileMapper.findByUid(uid);

        if (fileEntity == null) {
            //Result的error不是泛类，会有警告
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "文件不存在"));

        }

        try{
            String fullUrl = fileEntity.getUrl();
            if(fullUrl == null || !fullUrl.startsWith(fileBaseUrl)) {
                // URL不合法，无法提取文件名
                logger.error("文件URL不合法，无法提取文件名: {}", fullUrl);
                fileMapper.deleteByUid(uid);
                return ResponseEntity.ok(Result.success("文件记录已删除，但文件URL不合法，无法删除文件"));
            }

            String fileNameToDelete = fullUrl.substring(fileBaseUrl.length());

            boolean isFileDeleted = fileStorageService.deleteFile(fileNameToDelete);

            if(isFileDeleted) {
                fileMapper.deleteByUid(uid);
                logger.info("文件删除成功，UID: {}, 文件名: {}", uid, fileNameToDelete);
                return ResponseEntity.ok(Result.success("文件已删除"));
            } else {
                logger.error("文件删除失败，可能文件不存在或无法访问，UID: {}, 文件名: {}", uid, fileNameToDelete);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "文件删除失败，可能文件不存在或无法访问"));
            }

        } catch (Exception e) {
            logger.error("删除文件过程中发生异常，UID: {}", uid, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "删除文件过程中发生异常"));
        }

    }

}
