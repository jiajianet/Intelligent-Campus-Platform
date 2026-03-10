package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Article;
import com.xiyanchenghong.backenduser.domain.Cover;
import com.xiyanchenghong.backenduser.mapper.ArticleMapper;
import com.xiyanchenghong.backenduser.service.ArticleService;
import com.xiyanchenghong.backenduser.specification.ArticleSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleServicelmpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    // 保存文章
    public Article saveArticle(Article article) {
        if (article.getPubDate() == null) {
            article.setPubDate(LocalDateTime.now());
        }
        if (article.getCover() == null) {
            article.setCover(new Cover(0, null));
        }
        articleMapper.insertArticle(article);
        return article;
    }

    // 删除文章
    public void deleteArticle(Long id) {
        articleMapper.deleteArticle(id);
    }

    // 更新文章
    public Article updateArticle(Long id, Article article) {
        // 查找原文章
        Article existingArticle = articleMapper.getArticleById(id);
        if (existingArticle == null) {
            return null; // 文章不存在
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
        articleMapper.updateArticle(existingArticle);
        return existingArticle;
    }

    // 查找文章
    public Article getArticleById(Long id) {
        Article article = articleMapper.getArticleById(id);
        if (article != null) {
            Cover cover = articleMapper.selectCoverByArticleId(id);
            article.setCover(cover);
        }
        return article;
    }

    // 获取分页数据
    public List<Article> getArticles(int page, int perPage, Integer status, Long channelId, LocalDateTime beginDate,
                                     LocalDateTime endDate) {
        // 构建查询条件
        ArticleSpecification spec = new ArticleSpecification(status, channelId, beginDate, endDate);

        // 分页请求
        int offset = (page - 1) * perPage;
        List<Article> articles = articleMapper.getArticles(spec.toSqlCondition(), offset, perPage);

        // 获取封面数据
        for (Article article : articles) {
            Cover cover = articleMapper.selectCoverByArticleId(article.getId());
            article.setCover(cover);
        }

        return articles;
    }

    // 获取文章的总记录数，用于计算分页的总页数
    public long countArticles(Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate) {
        // 构建查询条件
        ArticleSpecification spec = new ArticleSpecification(status, channelId, beginDate, endDate);

        // 返回符合条件的总记录数
        return articleMapper.countArticles(spec.toSqlCondition());
    }
}