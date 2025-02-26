package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Article;
import java.time.LocalDateTime;
import java.util.List;

public interface ArticleService {

    // 保存文章
    Article saveArticle(Article article);

    // 删除文章
    void deleteArticle(Long id);

    // 更新文章
    Article updateArticle(Long id, Article article);

    // 查找文章
    Article getArticleById(Long id);

    // 获取分页数据
    List<Article> getArticles(int page, int perPage, Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate);

    // 获取文章的总记录数，用于计算分页的总页数
    long countArticles(Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate);

}