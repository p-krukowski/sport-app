package com.sportapp.demo.models.dtos.social;

import javax.validation.constraints.NotBlank;

public class EntryCommentPostDto {

    @NotBlank
    private String content;
    private String imageUrl;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
