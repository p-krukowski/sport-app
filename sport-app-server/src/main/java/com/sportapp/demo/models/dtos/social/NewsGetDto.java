package com.sportapp.demo.models.dtos.social;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

}
