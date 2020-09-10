package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class NewsComment extends Comment {

  @ManyToOne
  private News news;

  @OneToMany(mappedBy = "comment")
  private List<NewsCommentAnswer> answers;

  //----------Getters&Setters-----------

  public List<NewsCommentAnswer> getAnswers() {
    return answers;
  }

  public void setAnswers(List<NewsCommentAnswer> answers) {
    this.answers = answers;
  }
}
