package com.xiyanchenghong.backenduser.domain;


import jakarta.persistence.Embeddable;


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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
