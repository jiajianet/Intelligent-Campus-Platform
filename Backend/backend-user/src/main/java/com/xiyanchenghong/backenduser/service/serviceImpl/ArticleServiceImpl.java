package com.xiyanchenghong.backenduser.service.serviceImpl;


import com.xiyanchenghong.backenduser.domain.Article;
import com.xiyanchenghong.backenduser.domain.Cover;
import com.xiyanchenghong.backenduser.repository.ArticleRepository;
import com.xiyanchenghong.backenduser.service.ArticleService;
import com.xiyanchenghong.backenduser.specification.ArticleSpecification;
import com.xiyanchenghong.backenduser.utils.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ArticleServiceImpl implements ArticleService {
    // 上传目录，这里用 uploads 文件夹，注意最好确保生成的路径正确
    // 从 application.properties 中读取上传目录配置
    @Value("${upload.dir}")
    private String uploadDir;

    @Value("${image.base-url}")
    private String imageBaseUrl;

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    // 保存文章
    public Article saveArticle(Article article) {
        if (article.getPubDate() == null) {
            article.setPubDate(LocalDateTime.now());
        }
        if (article.getCover() == null) {
            article.setCover(new Cover(0, null));
        }
        return articleRepository.save(article);
    }

    // 删除文章同时删除图片
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article != null){
            Cover cover = article.getCover();
            if (cover != null && cover.getImage() != null){
                FileUtils.deleteFile(uploadDir, cover.getImage());
            }
            articleRepository.deleteById(id);
        }

    }

    // 更新文章同时删除图片
    public Article updateArticle(Long id, Article article) {
        // 查找原文章
        Article existingArticle = articleRepository.findById(id).orElse(null);
        if (existingArticle == null) {
            return null; // 文章不存在
        }

        Cover newCover = article.getCover();
        Cover oldCover = existingArticle.getCover();

        //新封面不同时处理图片更新
        if(newCover != null && oldCover != null && !newCover.getImage().equals(oldCover.getImage())){
            //删除旧照片
            FileUtils.deleteFile(uploadDir, oldCover.getImage());
        }

        //当从有图变为无图的时候
        if(oldCover != null && oldCover.getType() > 0 && newCover != null && newCover.getType() == 0){
            if(oldCover.getImage() != null){
                FileUtils.deleteFile(uploadDir, oldCover.getImage());
            }
            //清除数据库图片路径
            newCover.setImage(null);
        }

        // 更新字段（避免 `null` 覆盖已有值）
        if (article.getTitle() != null) {
            existingArticle.setTitle(article.getTitle());
        }
        if (article.getContent() != null) {
            existingArticle.setContent(article.getContent());
        }
        if (article.getStatus() != -1) {
            existingArticle.setStatus(article.getStatus());
        }
        if (article.getChannelId() != null) {
            existingArticle.setChannelId(article.getChannelId());
        }
        if (article.getPubDate() != null) {
            existingArticle.setPubDate(article.getPubDate());
        }
        if (article.getCover() != null) {
            existingArticle.setCover(article.getCover()); // 确保封面信息也被更新
        }

        // 保存并返回更新后的文章
        return articleRepository.save(existingArticle);
    }

    // 查找文章
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null); // 如果找不到文章，返回 null
    }

    // 获取分页数据
    public List<Article> getArticles(int page, int perPage, Integer status, Long channelId, LocalDateTime beginDate,
            LocalDateTime endDate) {
        // 构建查询条件
        ArticleSpecification spec = new ArticleSpecification(status, channelId, beginDate, endDate);

        // 分页请求
        Pageable pageable = PageRequest.of(page - 1, perPage); // page 从 0 开始
        Page<Article> articlePage = articleRepository.findAll(spec.toSpecification(), pageable);

        return articlePage.getContent();
    }

    // 获取文章的总记录数，用于计算分页的总页数
    public long countArticles(Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate) {
        // 构建查询条件
        ArticleSpecification spec = new ArticleSpecification(status, channelId, beginDate, endDate);

        // 返回符合条件的总记录数
        return articleRepository.count(spec.toSpecification());
    }

    //保存图片
    public String saveImage(MultipartFile file) throws IOException {
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

        return imageBaseUrl + fileName;
    }

    //访问图片
    public Resource getImageResource(String imageName) throws IOException{
        File file = new File(uploadDir, imageName);
        if(!file.exists()){
            throw new FileNotFoundException("图片不存在");
        }
        return new FileSystemResource(file);
    }

}