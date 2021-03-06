package com.sportapp.demo.models.dtos.social;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

public class NewsCommentGetDto {

  private String content;
  private int score;
  private AuthorDto author;
  private List<EntryCommentGetDto> comments;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  private LocalDateTime createdAt;

  public NewsCommentGetDto() {
  }

  public NewsCommentGetDto(String content, int score, AuthorDto author,
      List<EntryCommentGetDto> comments) {
    this.content = content;
    this.score = score;
    this.author = author;
    this.comments = comments;
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

  public AuthorDto getAuthor() {
    return author;
  }

  public void setAuthor(AuthorDto author) {
    this.author = author;
  }

  public List<EntryCommentGetDto> getComments() {
    return comments;
  }

  public void setComments(List<EntryCommentGetDto> comments) {
    this.comments = comments;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
