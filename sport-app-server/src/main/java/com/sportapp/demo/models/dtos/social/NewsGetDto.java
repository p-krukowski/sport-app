package com.sportapp.demo.models.dtos.social;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class NewsGetDto {

    private Long id;
    private String value;
    private int score;
    private AuthorDto author;
    private String title;
    private String content;
    private String imageUrl;
    private String description;
    private String link;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    public NewsGetDto() {
    }

    public NewsGetDto(Long id, String value, int score, String title,
                      String imageUrl, String link, LocalDateTime createdAt) {
        this.id = id;
        this.value = value;
        this.score = score;
        this.title = title;
        this.imageUrl = imageUrl;
        this.link = link;
        this.createdAt = createdAt;
    }

    //----------Getters&Setters-----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
