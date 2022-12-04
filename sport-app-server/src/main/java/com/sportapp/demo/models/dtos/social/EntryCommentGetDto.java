package com.sportapp.demo.models.dtos.social;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntryCommentGetDto {

  private Long id;
  private String content;
  private AuthorDto author;
  private int score;
  private String imageUrl;
  private LocalDateTime createdAt;

}
