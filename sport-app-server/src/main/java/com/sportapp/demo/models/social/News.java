package com.sportapp.demo.models.social;

import javax.persistence.Entity;

@Entity
public class News extends Post {

    private String title;
    private String content;
    private String imageUrl;
    private String link;

    //----------Getters&Setters-----------

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
