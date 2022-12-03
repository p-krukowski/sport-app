package com.sportapp.demo.models.social;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "news_comments_answers")
@Getter
@Setter
public class NewsCommentAnswer extends Comment {

  @ManyToOne
  @JoinColumn(name = "comment_id", nullable = false)
  private NewsComment comment;

}
