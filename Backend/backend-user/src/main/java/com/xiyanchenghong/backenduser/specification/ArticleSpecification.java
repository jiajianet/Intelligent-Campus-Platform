package com.xiyanchenghong.backenduser.specification;

import java.time.LocalDateTime;

public class ArticleSpecification {

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

    public String toSqlCondition() {
        StringBuilder condition = new StringBuilder("WHERE 1=1");

        if (status != null) {
            condition.append(" AND status = ").append(status);
        }
        if (channelId != null) {
            condition.append(" AND channel_id = ").append(channelId);
        }
        if (beginDate != null) {
            condition.append(" AND pub_date >= '").append(beginDate).append("'");
        }
        if (endDate != null) {
            condition.append(" AND pub_date <= '").append(endDate).append("'");
        }

        return condition.toString();
    }

    // Getters and setters

    public Integer getStatus() {
        return status;
    }

    public Long getChannelId() {
        return channelId;
    }

    public LocalDateTime getBeginDate() {
        return beginDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }
}