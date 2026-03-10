package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Channel {
    private Integer id;
    private String name;

    public Channel(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Channel() {

    }
}