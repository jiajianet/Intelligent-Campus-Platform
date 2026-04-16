package com.xiyanchenghong.backenduser.ai.model;

public class AiArticleStatsRow {
    private long totalCount;
    private long pendingCount;
    private long publishedCount;
    private long draftCount;
    private long totalReadCount;
    private long totalCommentCount;
    private long totalLikeCount;

    public long getTotalCount() { return totalCount; }
    public void setTotalCount(long totalCount) { this.totalCount = totalCount; }
    public long getPendingCount() { return pendingCount; }
    public void setPendingCount(long pendingCount) { this.pendingCount = pendingCount; }
    public long getPublishedCount() { return publishedCount; }
    public void setPublishedCount(long publishedCount) { this.publishedCount = publishedCount; }
    public long getDraftCount() { return draftCount; }
    public void setDraftCount(long draftCount) { this.draftCount = draftCount; }
    public long getTotalReadCount() { return totalReadCount; }
    public void setTotalReadCount(long totalReadCount) { this.totalReadCount = totalReadCount; }
    public long getTotalCommentCount() { return totalCommentCount; }
    public void setTotalCommentCount(long totalCommentCount) { this.totalCommentCount = totalCommentCount; }
    public long getTotalLikeCount() { return totalLikeCount; }
    public void setTotalLikeCount(long totalLikeCount) { this.totalLikeCount = totalLikeCount; }
}
