package com.sportapp.demo.models.dtos.social;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsPostDto {

  private String title;
  private String description;
  private String content;
  private String imageURL;
  private String url;
  private String tags;

}
