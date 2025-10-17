package com.xiyanchenghong.backenduser.controller;


import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class ArticleImageUploadController {

    // 上传目录，这里用 uploads 文件夹，注意最好确保生成的路径正确
    // 从 application.properties 中读取上传目录配置
    @Value("${upload.dir}")
    private String uploadDir;

    @Value("${image.base-url}")
    private String imageBaseUrl;

    //访问
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> getImage(@PathVariable String imageName) {
        try {
            File file = new File(uploadDir, imageName);
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(500,"图片未找到"));
            }

            // 返回文件的 URL 或者文件内容（这里假设是通过静态资源路径来访问）
            return ResponseEntity.ok().body(new FileSystemResource(file));  // 这里假设你返回的是文件内容，可以用其他方式直接返回 URL
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500,"服务器错误"));
        }
    }
    //上传
    @PostMapping("/upload")
    public ResponseEntity<Object> handleFileUpload(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Result.error(500,"文件为空"));
        }

        try {
            // 创建上传目录（如果不存在）
            // File uploadDir = new File(UPLOAD_DIR);
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists() && !uploadDirectory.mkdirs()) {
                throw new IOException("无法创建上传目录！");
            }

            // 生成唯一的文件名，这里截取 UUID 的前8位
            String fileName = UUID.randomUUID().toString().substring(0, 8) + "_" + file.getOriginalFilename();
            // 生成目标文件，推荐使用 File 的构造函数进行拼接
            fileName = fileName.replace(" ", "_");
            File dest = new File(uploadDirectory, fileName);

            // 保存文件到本地磁盘
            file.transferTo(dest);

            // 构造文件访问路径，注意根据实际情况修改 URL 前缀
            String fileUrl = imageBaseUrl + fileName;
            // 使用 Result.success 方法返回数据，其中 data 为一个 Map，包含 url 字段
            return ResponseEntity.ok(Result.success(Collections.singletonMap("url", fileUrl), "上传成功"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Result.error(500,"文件上传失败"));
        }
    }
}
