package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cover {
    private Integer type;
    private String image;

    public Cover(Integer type, String image) {
        this.type = type;
        this.image = image;
    }
}