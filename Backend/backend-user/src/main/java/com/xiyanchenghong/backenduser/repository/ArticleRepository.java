package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ArticleRepository extends JpaRepository<Article, Long>,JpaSpecificationExecutor<Article> {

}
