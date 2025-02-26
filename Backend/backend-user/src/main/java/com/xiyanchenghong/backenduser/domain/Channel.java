package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Channel {
    @Id  // 标记 id 字段为主键
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public Channel(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Channel() {

    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
