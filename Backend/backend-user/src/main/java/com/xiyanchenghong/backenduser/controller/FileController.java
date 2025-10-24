package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import com.xiyanchenghong.backenduser.repository.FileRepository;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@RestController
@RequestMapping("/user/files")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Value("${file.base-url}")
    private String fileBaseUrl;


    private final FileRepository fileRepository;

    private final FileStorageService fileStorageService;

    @Autowired
    public FileController(FileStorageService fileStorageService, FileRepository fileRepository) {
        this.fileRepository = fileRepository;
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

                FileEntity fileEntity = new FileEntity();
                fileEntity.setUid(uid);
                fileEntity.setName(file.getOriginalFilename());
                fileEntity.setStatus("done");
                fileEntity.setUrl(fileUrl);
                fileEntity.setThumbUrl(fileUrl);
                fileEntity.setType(file.getContentType());

                fileRepository.save(fileEntity);

                response.put("uid", uid);
                response.put("name", file.getOriginalFilename());
                response.put("url", fileBaseUrl);
                response.put("thumbUrl", fileBaseUrl);
                response.put("percent", 100);

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

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    // Content-Disposition: 'inline' 表示浏览器应尝试直接显示文件
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
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
        List<FileEntity> files = fileRepository.findByStatus("done");
        logger.info("查询到{}个有效文件", files.size());
        return ResponseEntity.ok(Result.success(files));
    }

    @PutMapping("/reorder")
    public ResponseEntity<Result<String>> reorderFiles(@RequestBody List<String> uids) {
        logger.info("开始重排文件顺序，收到{}个文件ID", uids.size());
        List<FileEntity> files = fileRepository.findAll();
        Map<String, Integer> orderMap = new HashMap<>();
        for (int i = 0; i < uids.size(); i++) {
            orderMap.put(uids.get(i), i);
        }

        files.sort(Comparator.comparing(f -> orderMap.getOrDefault(f.getUid(), Integer.MIN_VALUE)));


        logger.debug("更新{}个文件的排序信息", files.size());
        fileRepository.saveAll(files);

        return ResponseEntity.ok(Result.success("文件顺序已更新"));
    }

    //TODO可能会重复（概率小）？
    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<Object> deleteFile(@PathVariable String uid) {
        logger.info("删除文件，UID：{}", uid);
        //使用Java 8 引入的容器类避免空指针异常
        Optional<FileEntity> fileEntityOptional = Optional.ofNullable(fileRepository.findByUid(uid));

        if (fileEntityOptional.isPresent()) {
            FileEntity fileEntity = fileEntityOptional.get();

            try {

                String fullUrl = fileEntity.getUrl();
                //假如文件名时URL的最后一部分，并且前面有fileBaseUrl
                //假如fileBaseUrl时正确定，是以/结尾
                if(fullUrl == null || !fullUrl.startsWith(fileBaseUrl)) {
                    logger.warn("文件URL格式不正确或者为空：{}",fullUrl);
                    return ResponseEntity.ok(Result.success("文件记录已删除，物理文件跳过处理"));
                }

                //提取文件名(例如：从 'http://xxx/uuid_name.jpg' 得到 'uuid_name.jpg')
                String fileNameToDelete = fullUrl.substring(fileBaseUrl.length());

                //删除物理文件
                boolean isFileDeleted = fileStorageService.deleteFile(fileNameToDelete);
                if (isFileDeleted) {
                    //删除数据库记录
                    fileRepository.delete(fileEntity);
                    return ResponseEntity.ok(Result.success("文件删除成功"));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "文件删除失败"));
                }

            } catch (Exception e) {
                logger.error("文件删除失败: {}", uid, e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Result.error(500, "文件删除失败"));
            }


        }
        //Result的error不是泛类，会有警告
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "文件不存在"));
    }

}
