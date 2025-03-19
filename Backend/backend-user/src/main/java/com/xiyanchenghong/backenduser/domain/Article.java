package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Setter
@Getter
public class Article {

    private Long id;
    private String title;
    private int status;
    private int commentCount;
    private int likeCount;
    private int readCount;
    private Long channelId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime pubDate;
    private String content;
    private Cover cover;


}