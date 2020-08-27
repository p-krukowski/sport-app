package com.sportapp.demo.models.dtos.social;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

public class NewsCommentGetDto {

  private String value;
  private int score;
  private AuthorDto author;
  private List<CommentGetDto> comments;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  private LocalDateTime createdAt;

  public NewsCommentGetDto() {
  }

  public NewsCommentGetDto(String value, int score, AuthorDto author,
      List<CommentGetDto> comments) {
    this.value = value;
    this.score = score;
    this.author = author;
    this.comments = comments;
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

  public List<CommentGetDto> getComments() {
    return comments;
  }

  public void setComments(List<CommentGetDto> comments) {
    this.comments = comments;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
