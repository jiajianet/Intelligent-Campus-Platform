//package com.xiyanchenghong.backenduser.controller;
//import com.xiyanchenghong.backenduser.domain.Article;
//import com.xiyanchenghong.backenduser.model.ResourceNotFoundException;
//import com.xiyanchenghong.backenduser.service.serviceImpl.ArticleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/articles")
//public class ArticleController {
//    @Autowired
//    private ArticleService articleService;
//
//    @GetMapping
//    public List<Article> getAllArticles() {
//        return articleService.getAllArticles();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
//        Article article = articleService.getArticleById(id).orElseThrow(() -> new ResourceNotFoundException("Article not found"));
//        return ResponseEntity.ok(article);
//    }
//
//    @PostMapping
//    public Article createArticle(@RequestBody Article article) {
//        return articleService.createArticle(article);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
//        Article updatedArticle = articleService.updateArticle(id, articleDetails);
//        return ResponseEntity.ok(updatedArticle);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
//        articleService.deleteArticle(id);
//        return ResponseEntity.noContent().build();
//    }
//}