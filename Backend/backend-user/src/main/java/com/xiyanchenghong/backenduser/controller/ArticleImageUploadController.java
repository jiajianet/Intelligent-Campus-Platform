package com.xiyanchenghong.backenduser.controller;


import com.xiyanchenghong.backenduser.service.serviceImpl.ArticleServicelmpl;
import com.xiyanchenghong.backenduser.utils.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collections;

@RestController
@RequestMapping("/user")
public class ArticleImageUploadController {

    private static final Logger logger = LoggerFactory.getLogger(ArticleImageUploadController.class);
    private final ArticleServicelmpl imageService;

    public ArticleImageUploadController(ArticleServicelmpl imageService) {
        this.imageService = imageService;
    }

    //访问
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> getImage(@PathVariable String imageName) {
        logger.debug("尝试获取图片{}", imageName);
        try {
            Resource resource = imageService.getImageResource(imageName);
            logger.info("成功获取图片：{}", imageName);
            return ResponseEntity.ok().body(resource);  // 这里假设你返回的是文件内容，可以用其他方式直接返回 URL
            // 返回文件的 URL 或者文件内容（这里假设是通过静态资源路径来访问）
        } catch (FileNotFoundException e) {
            logger.error("图片未找到：{}", imageName, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(500, "图片未找到"));

        } catch (IOException e) {
            logger.error("获取图片时发生IO异常：{}", imageName, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "服务器错误"));

        }
    }

    //上传
    @PostMapping("/upload")
    public ResponseEntity<Object> handleFileUpload(@RequestParam("image") MultipartFile file) {
        logger.debug("尝试上传文件：原始文件名={}", file.getOriginalFilename());
        try {
            String fileUrl = imageService.saveImage(file);
            // 使用 Result.success 方法返回数据，其中 data 为一个 Map，包含 url 字段
            logger.info("文件上传成功:存储路径={}", fileUrl);
            return ResponseEntity.ok(Result.success(Collections.singletonMap("url", fileUrl), "上传成功"));
        } catch (IOException e) {
            logger.error("文件上传失败：文件名={}", file.getOriginalFilename(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Result.error(500, "文件上传失败" + e.getMessage()));
        }
    }
}
