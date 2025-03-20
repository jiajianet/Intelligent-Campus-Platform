package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Article;
import com.xiyanchenghong.backenduser.service.serviceImpl.ArticleServicelmpl;
import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/user")
public class ArticleController {

    @Autowired
    private ArticleServicelmpl articleService;

    // 创建文章
    @PostMapping("/articles")
    public ResponseEntity<Object> createArticle(@RequestBody Article article) {
        try {
            Article createdArticle = articleService.saveArticle(article);
            return ResponseEntity.ok(createdArticle);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating article: " + e.getMessage());
        }

    }

    // 删除文章
    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Object> deleteArticle(@PathVariable("id") Long articleId) {
        try {
            articleService.deleteArticle(articleId);
            return ResponseEntity.ok("文章删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("文章删除失败: " + e.getMessage());
        }
    }

    // 更新文章
    @PutMapping("/articles/{id}")
    public ResponseEntity<Object> updateArticle(@PathVariable("id") Long id, @RequestBody Article article) {
        try {
            Article updatedArticle = articleService.updateArticle(id, article);
            if (updatedArticle != null) {
                return ResponseEntity.ok(Result.success(updatedArticle, "文章更新成功"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(500, "文章ID不存在: " + id));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Result.error(500, "更新文章错误: " + e.getMessage()));
        }
    }

    // 获取文章列表
    @GetMapping("/articles")
    public ResponseEntity<Object> getArticles(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "perPage", defaultValue = "10") int perPage,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "channelId", required = false) Long channelId,
            @RequestParam(value = "beginPubDate", required = false) String beginPubDate,
            @RequestParam(value = "endPubDate", required = false) String endPubDate) {
        try {
            LocalDateTime beginDate = (beginPubDate != null && !beginPubDate.isEmpty())
                    ? LocalDateTime.parse(beginPubDate + "T00:00:00")
                    : null;
            LocalDateTime endDate = (endPubDate != null && !endPubDate.isEmpty())
                    ? LocalDateTime.parse(endPubDate + "T23:59:59")
                    : null;

            List<Article> articles = articleService.getArticles(page, perPage, status, channelId, beginDate, endDate);
            int totalCount = (int) articleService.countArticles(status, channelId, beginDate, endDate);
            int totalPages = (int) Math.ceil((double) totalCount / perPage);

            // 构建分页数据
            Result.Data data = new Result.Data();
            data.setResults(articles);
            data.setTotalCount(totalCount);
            data.setTotalPages(totalPages);
            data.setPage(page);
            data.setPerPage(perPage);

            Result<Result.Data> result = Result.success(data, "OK");

            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Result.error(500, "Error fetching articles: " + e.getMessage()));
        }
    }

    // 获取单个文章
    @GetMapping("/articles/{id}")
    public ResponseEntity<Object> getArticleById(@PathVariable("id") Long id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("文章ID不能为空");
        }
        try {
            Article article = articleService.getArticleById(id);
            if (article != null) {
                // 构建单个文章返回数据
                Result.Data data = new Result.Data();
                data.setId(String.valueOf(article.getId()));
                data.setTitle(article.getTitle());
                data.setChannelId(article.getChannelId());
                data.setContent(article.getContent());
                data.setPubDate(article.getPubDate().toString());

                // 设置封面信息
                Result.Data.Cover cover = new Result.Data.Cover();
                cover.setType(article.getCover().getType());
                cover.setImage(article.getCover().getImage());
                data.setCover(cover);

                Result<Result.Data> result = Result.success(data, "OK");
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(500, "Article not found"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Result.error(500, "Error fetching article: " + e.getMessage()));
        }
    }
}