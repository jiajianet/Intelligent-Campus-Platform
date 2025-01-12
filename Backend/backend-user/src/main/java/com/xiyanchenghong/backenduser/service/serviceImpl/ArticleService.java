//package com.xiyanchenghong.backenduser.service.serviceImpl;
//
//import com.xiyanchenghong.backenduser.domain.Article;
//import com.xiyanchenghong.backenduser.model.ResourceNotFoundException;
//import com.xiyanchenghong.backenduser.repository.ArticleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class ArticleService {
//    @Autowired
//    private ArticleRepository articleRepository;
//
//    public List<Article> getAllArticles() {
//        return articleRepository.findAll();
//    }
//
//    public Optional<Article> getArticleById(Long id) {
//        return articleRepository.findById(id);
//    }
//
//    public Article createArticle(Article article) {
//        article.setCreatedAt(LocalDateTime.now());
//        article.setUpdatedAt(LocalDateTime.now());
//        return articleRepository.save(article);
//    }
//
//    public Article updateArticle(Long id, Article articleDetails) {
//        Article article = articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article not found"));
//        article.setTitle(articleDetails.getTitle());
//        article.setContent(articleDetails.getContent());
//        article.setAuthor(articleDetails.getAuthor());
//        article.setUpdatedAt(LocalDateTime.now());
//        return articleRepository.save(article);
//    }
//
//    public void deleteArticle(Long id) {
//        Article article = articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article not found"));
//        articleRepository.delete(article);
//    }
//}
