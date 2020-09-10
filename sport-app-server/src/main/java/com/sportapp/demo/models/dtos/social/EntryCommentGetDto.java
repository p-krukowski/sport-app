package com.sportapp.demo.models.dtos.social;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class EntryCommentGetDto {

    private Long id;
    private String value;
    private AuthorDto author;
    private int score;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    public EntryCommentGetDto() {
    }

    public EntryCommentGetDto(Long id, String value, AuthorDto author, int score,
        LocalDateTime createdAt) {
        this.id = id;
        this.value = value;
        this.author = author;
        this.score = score;
        this.createdAt = createdAt;
    }

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

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
