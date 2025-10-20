package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Table(name = "file_entity")
@Entity
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uid",nullable =false, unique = true)
    private String uid;

    @Column(name = "name",nullable = false)
    private String Name;

    @Column(name = "status", nullable = false)
    private String status;

    private Integer percent;

    @Column(name = "url", length = 512)
    private String url;

    @Column(name = "thumb_url", nullable = false)
    private String thumbUrl;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
