package com.sportapp.demo.models.dtos.social;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntryCommentPostDto {

  @NotBlank
  private String content;

  private String imageUrl;

}
