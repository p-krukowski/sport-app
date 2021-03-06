package com.sportapp.demo.models.dtos.social;

import java.time.LocalDateTime;

public class NewsGetDto {

    private Long id;
    private int score;
    private String authorName;
    private String title;
    private String content;
    private String imageUrl;
    private String description;
    private String link;

    private LocalDateTime createdAt;

    public NewsGetDto() {
    }

    public NewsGetDto(Long id, String description, String content, int score, String title,
        String imageUrl, String link, LocalDateTime createdAt, String authorName) {
        this.id = id;
        this.description = description;
        this.content = content;
        this.score = score;
        this.title = title;
        this.imageUrl = imageUrl;
        this.link = link;
        this.createdAt = createdAt;
        this.authorName = authorName;
    }

    //----------Getters&Setters-----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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
