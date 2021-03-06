package com.sportapp.demo.models.dtos.social;

import java.time.LocalDateTime;

public class EntryGetDto {

  private Long id;
  private AuthorDto author;
  private String content;
  private int score;
  private int commentsAmount;
  private String imageUrl;

  private LocalDateTime createdAt;

  public EntryGetDto() {
  }

  public EntryGetDto(AuthorDto author, Long id, String content, int score,
      LocalDateTime createdAt) {
    this.author = author;
    this.id = id;
    this.content = content;
    this.score = score;
    this.createdAt = createdAt;
  }

  //----------Getters&Setters-----------

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public AuthorDto getAuthor() {
    return author;
  }

  public void setAuthor(AuthorDto author) {
    this.author = author;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public int getCommentsAmount() {
    return commentsAmount;
  }

  public void setCommentsAmount(int commentsAmount) {
    this.commentsAmount = commentsAmount;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
