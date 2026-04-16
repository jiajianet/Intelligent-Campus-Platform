package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.ai.model.AiArticleStatsRow;
import com.xiyanchenghong.backenduser.domain.Article;
import com.xiyanchenghong.backenduser.domain.Cover;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ArticleMapper {

    Article getArticleById(Long id);

    List<Article> getAllArticles();

    void insertArticle(Article article);

    void updateArticle(Article article);

    void deleteArticle(Long id);

    List<Article> getArticles(@Param("spec") String spec, @Param("offset") int offset, @Param("perPage") int perPage);

    long countArticles(@Param("spec") String spec);

    long countArticlesWithFilters(Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate);

    List<Article> findRecentArticles(int days);

    List<Article> getArticlesByStatus(Integer status, int limit, Integer channelId, LocalDateTime beginDate, LocalDateTime endDate);

    List<Article> searchArticlesByTitle(String keyword);

    Cover selectCoverByArticleId(Long articleId);
}
