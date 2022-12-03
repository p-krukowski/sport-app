package com.sportapp.demo.models.dtos.social;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntryGetDto {

  private Long id;
  private AuthorDto author;
  private String content;
  private int score;
  private int commentsAmount;
  private String imageUrl;
  private LocalDateTime createdAt;

}
