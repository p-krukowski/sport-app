package com.sportapp.demo.models.social;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "news_comments_answers")
public class NewsCommentAnswer extends Comment {

  @ManyToOne
  private NewsComment comment;

  public NewsComment getComment() {
    return comment;
  }

  public void setComment(NewsComment comment) {
    this.comment = comment;
  }
}
