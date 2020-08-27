package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class NewsComment extends Post {

  @OneToMany
  private List<Comment> comments;

  //----------Getters&Setters-----------

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }
}
