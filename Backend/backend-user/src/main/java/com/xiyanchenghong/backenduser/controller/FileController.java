package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import com.xiyanchenghong.backenduser.repository.FileRepository;
import com.xiyanchenghong.backenduser.service.FileStorageService;
import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@RestController
@RequestMapping("/user/files")
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Value("${file.base-url}")
    private String fileBaseUrl;

    @Autowired
    private FileRepository fileRepository;

    private final FileStorageService fileStorageService;

    @Autowired
    public FileController(FileStorageService fileStorageService) {
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
                fileEntity.setUrl(file.getOriginalFilename());
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

    @GetMapping("/getFiles")
    public ResponseEntity<Result<List<FileEntity>>> getFiles() {
        logger.debug("查询所以状态为done的文件");
        List<FileEntity> files = fileRepository.findByStatus("done");
        logger.info("查询到{}个有效文件",files.size());
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

}
