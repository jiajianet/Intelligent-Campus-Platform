package com.xiyanchenghong.backenduser.domain;
import jakarta.persistence.*;
//连接school表格

@Table(name = "school")
@Entity
public class School {

    @Column(unique = true)
    private String name;
    @Id
    private Long id;

    public School() {
    }

    public School(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

