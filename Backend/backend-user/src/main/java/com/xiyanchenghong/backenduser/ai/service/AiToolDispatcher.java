package com.xiyanchenghong.backenduser.ai.service;

import com.xiyanchenghong.backenduser.ai.dto.ReferenceItem;
import com.xiyanchenghong.backenduser.ai.model.AiToolExecutionResult;
import com.xiyanchenghong.backenduser.domain.Article;
import com.xiyanchenghong.backenduser.mapper.ArticleMapper;
import com.xiyanchenghong.backenduser.service.ArticleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class AiToolDispatcher {
    private final ArticleService articleService;
    private final ArticleMapper articleMapper;
    private final ObjectMapper objectMapper;

    public AiToolDispatcher(ArticleService articleService, ArticleMapper articleMapper, ObjectMapper objectMapper) {
        this.articleService = articleService;
        this.articleMapper = articleMapper;
        this.objectMapper = objectMapper;
    }

    public AiToolExecutionResult execute(String toolName, Map<String, Object> arguments) {
        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName(toolName);

        try {
            switch (toolName) {
                case "get_article_count":
                    result = executeGetArticleCount(arguments);
                    break;
                case "get_recent_articles":
                    result = executeGetRecentArticles(arguments);
                    break;
                case "get_pending_articles":
                    result = executeGetPendingArticles(arguments);
                    break;
                case "search_articles_by_title":
                    result = executeSearchArticlesByTitle(arguments);
                    break;
                case "get_article_by_id":
                    result = executeGetArticleById(arguments);
                    break;
                case "get_article_stats":
                    result = executeGetArticleStats(arguments);
                    break;
                default:
                    result.setSuccess(false);
                    result.setSummary("未知工具: " + toolName);
                    result.setData(Collections.emptyMap());
            }
        } catch (Exception e) {
            result.setSuccess(false);
            result.setSummary("执行失败: " + e.getMessage());
            result.setData(Collections.emptyMap());
        }

        return result;
    }

    private AiToolExecutionResult executeGetArticleCount(Map<String, Object> arguments) {
        long count = articleMapper.countArticlesWithFilters(null, null, null, null);
        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("get_article_count");
        result.setSuccess(true);
        result.setSummary("当前共有 " + count + " 篇文章");
        result.setData(Map.of("count", count));
        result.setReferences(Collections.emptyList());
        return result;
    }

    private AiToolExecutionResult executeGetRecentArticles(Map<String, Object> arguments) {
        int days = arguments.containsKey("days") ? Integer.parseInt(arguments.get("days").toString()) : 7;
        List<Article> articles = articleMapper.findRecentArticles(days);
        
        List<ReferenceItem> references = new ArrayList<>();
        for (Article article : articles) {
            references.add(new ReferenceItem("article", String.valueOf(article.getId()), article.getTitle()));
        }

        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("get_recent_articles");
        result.setSuccess(true);
        result.setSummary("最近 " + days + " 天发布了 " + articles.size() + " 篇文章");
        result.setData(Map.of("articles", articles.stream().map(a -> Map.of("id", a.getId(), "title", a.getTitle(), "pubDate", a.getPubDate())).toList()));
        result.setReferences(references);
        return result;
    }

    private AiToolExecutionResult executeGetPendingArticles(Map<String, Object> arguments) {
        List<Article> articles = articleMapper.getArticlesByStatus(0, 100, null, null, null);
        
        List<ReferenceItem> references = new ArrayList<>();
        for (Article article : articles) {
            references.add(new ReferenceItem("article", String.valueOf(article.getId()), article.getTitle()));
        }

        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("get_pending_articles");
        result.setSuccess(true);
        result.setSummary("待审核文章有 " + articles.size() + " 篇");
        result.setData(Map.of("articles", articles.stream().map(a -> Map.of("id", a.getId(), "title", a.getTitle())).toList()));
        result.setReferences(references);
        return result;
    }

    private AiToolExecutionResult executeSearchArticlesByTitle(Map<String, Object> arguments) {
        String keyword = arguments.get("keyword").toString();
        List<Article> articles = articleMapper.searchArticlesByTitle(keyword);
        
        List<ReferenceItem> references = new ArrayList<>();
        for (Article article : articles) {
            references.add(new ReferenceItem("article", String.valueOf(article.getId()), article.getTitle()));
        }

        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("search_articles_by_title");
        result.setSuccess(true);
        result.setSummary("找到 " + articles.size() + " 篇标题包含「" + keyword + "」的文章");
        result.setData(Map.of("articles", articles.stream().map(a -> Map.of("id", a.getId(), "title", a.getTitle())).toList()));
        result.setReferences(references);
        return result;
    }

    private AiToolExecutionResult executeGetArticleById(Map<String, Object> arguments) {
        Long id = Long.parseLong(arguments.get("id").toString());
        Article article = articleMapper.getArticleById(id);
        
        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("get_article_by_id");
        if (article != null) {
            result.setSuccess(true);
            result.setSummary("文章标题: " + article.getTitle());
            result.setData(Map.of("article", Map.of("id", article.getId(), "title", article.getTitle(), "content", article.getContent() != null ? article.getContent().substring(0, Math.min(200, article.getContent().length())) : "")));
            result.setReferences(List.of(new ReferenceItem("article", String.valueOf(article.getId()), article.getTitle())));
        } else {
            result.setSuccess(false);
            result.setSummary("未找到 ID 为 " + id + " 的文章");
            result.setData(Collections.emptyMap());
        }
        return result;
    }

    private AiToolExecutionResult executeGetArticleStats(Map<String, Object> arguments) {
        long total = articleMapper.countArticlesWithFilters(null, null, null, null);
        long published = articleMapper.countArticlesWithFilters(1, null, null, null);
        long draft = articleMapper.countArticlesWithFilters(0, null, null, null);
        long deleted = articleMapper.countArticlesWithFilters(-1, null, null, null);

        AiToolExecutionResult result = new AiToolExecutionResult();
        result.setToolName("get_article_stats");
        result.setSuccess(true);
        result.setSummary("文章统计: 总计 " + total + " 篇，已发布 " + published + " 篇，草稿 " + draft + " 篇，已删除 " + deleted + " 篇");
        result.setData(Map.of("total", total, "published", published, "draft", draft, "deleted", deleted));
        result.setReferences(Collections.emptyList());
        return result;
    }

    public String serializeForToolMessage(AiToolExecutionResult result) {
        try {
            return objectMapper.writeValueAsString(result.getData());
        } catch (Exception e) {
            return "{}";
        }
    }

    public List<Map<String, Object>> getToolSchema() {
        return List.of(
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_article_count",
                    "description", "获取文章总数",
                    "parameters", Map.of("type", "object", "properties", Collections.emptyMap(), "required", Collections.emptyList())
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_recent_articles",
                    "description", "获取最近发布的文章",
                    "parameters", Map.of(
                        "type", "object",
                        "properties", Map.of("days", Map.of("type", "integer", "description", "天数，默认7天")),
                        "required", Collections.emptyList()
                    )
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_pending_articles",
                    "description", "获取待审核的文章列表",
                    "parameters", Map.of("type", "object", "properties", Collections.emptyMap(), "required", Collections.emptyList())
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "search_articles_by_title",
                    "description", "根据标题关键词搜索文章",
                    "parameters", Map.of(
                        "type", "object",
                        "properties", Map.of("keyword", Map.of("type", "string", "description", "搜索关键词")),
                        "required", List.of("keyword")
                    )
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_article_by_id",
                    "description", "根据ID获取文章详情",
                    "parameters", Map.of(
                        "type", "object",
                        "properties", Map.of("id", Map.of("type", "integer", "description", "文章ID")),
                        "required", List.of("id")
                    )
                )
            ),
            Map.of(
                "type", "function",
                "function", Map.of(
                    "name", "get_article_stats",
                    "description", "获取文章统计数据",
                    "parameters", Map.of("type", "object", "properties", Collections.emptyMap(), "required", Collections.emptyList())
                )
            )
        );
    }
}
