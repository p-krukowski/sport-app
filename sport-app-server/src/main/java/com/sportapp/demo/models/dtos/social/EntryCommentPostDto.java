package com.sportapp.demo.models.dtos.social;

import javax.validation.constraints.NotBlank;

public class EntryCommentPostDto {

    @NotBlank
    private String value;
    private String imageUrl;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
