package com.xiyanchenghong.backenduser.specification;


import com.xiyanchenghong.backenduser.domain.Article;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

import jakarta.persistence.criteria.*;

public class ArticleSpecification{

    private final Integer status;
    private final Long channelId;
    private final LocalDateTime beginDate;
    private final LocalDateTime endDate;

    public ArticleSpecification(Integer status, Long channelId, LocalDateTime beginDate, LocalDateTime endDate) {
        this.status = status;
        this.channelId = channelId;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }

    public Specification<Article> toSpecification() {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction(); // 创建一个初始的“且”条件

            if (status != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), status));
            }
            if (channelId != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("channelId"), channelId));
            }
            if (beginDate != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("pubDate"), beginDate));
            }
            if (endDate != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("pubDate"), endDate));
            }

            return predicate;
        };
    }
}
