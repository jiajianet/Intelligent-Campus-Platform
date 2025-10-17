package com.xiyanchenghong.backenduser.domain;


import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Embeddable
public class Cover {

    private Integer type;

    private String image;

    // Getters and Setters
    public Cover() {}

    public Cover(Integer type, String image) {
        this.type = type;
        this.image = image;
    }

}
