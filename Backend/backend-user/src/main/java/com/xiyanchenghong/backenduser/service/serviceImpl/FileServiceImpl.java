package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import com.xiyanchenghong.backenduser.mapper.FileMapper;
import com.xiyanchenghong.backenduser.service.FileService;
import com.xiyanchenghong.backenduser.service.FileStorageService;
import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Service
public class FileServiceImpl implements FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    private final FileMapper fileMapper;
    private final FileStorageService fileStorageService;

    @Autowired
    public FileServiceImpl(FileMapper fileMapper, FileStorageService fileStorageService) {
        this.fileMapper = fileMapper;
        this.fileStorageService = fileStorageService;
    }

    @Value("${file.base-url}")
    private String fileBaseUrl;

    @Override
    @Transactional
    public List<FileEntity> getAllDoneFiles() {
        logger.debug("查询所以状态为done的文件");
        List<FileEntity> files = fileMapper.findByStatusOrderBySortOrderAsc("done");
        logger.info("查询到{}个有效文件", files.size());
        return files;
    }

    @Override
    @Transactional //事务管理，确保数据库操作的一致性
    public List<Map<String, Object>> uploadFiles(MultipartFile[] files) {
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
                response.put("url", fileUrl);
                response.put("thumbUrl", fileUrl);
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
        return responseList;
    }

    @Override
    @Transactional
    public void reorderFiles(List<String> uids) {
        logger.info("开始重排文件顺序，收到{}个文件ID", uids.size());
        for (int i = 0; i < uids.size(); i++) {
            fileMapper.updateSortOrder(uids.get(i), i); //i是最新的sortOrder
        }
        logger.info("文件顺序重排完成");
    }

    @Override
    @Transactional
    public void deleteFiles(String uid) {
        logger.info("开始执行删除流程，UID：{}", uid);
        // MyBatis 根基UID查找
        FileEntity fileEntity = fileMapper.findByUid(uid);
        if (fileEntity == null) {
            throw new RuntimeException("文件不存在，UID: " + uid);
        }

        String fullUrl = fileEntity.getUrl();
        if (fullUrl != null && fullUrl.startsWith(fileBaseUrl)) {
            String fileNameToDelete = fullUrl.substring(fileBaseUrl.length());
            boolean isFileDeleted = fileStorageService.deleteFile(fileNameToDelete);

            if (isFileDeleted) {
                logger.info("文件删除成功，UID: {}, 文件名: {}", uid, fileNameToDelete);
            } else {
                logger.error("文件删除失败，可能文件不存在或无法访问，UID: {}, 文件名: {}", uid, fileNameToDelete);
                throw new RuntimeException("文件删除失败，可能文件不存在或无法访问");
            }
        } else {
            logger.error("文件URL不合法，无法提取文件名: {}", fullUrl);
            throw new RuntimeException("文件URL不合法，无法提取文件名");
        }

        fileMapper.deleteByUid(uid);

    }

}
