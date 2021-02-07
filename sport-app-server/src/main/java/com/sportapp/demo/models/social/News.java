package com.sportapp.demo.models.social;

import javax.persistence.Entity;

@Entity
public class News extends Post {

  private String title;
  private String description;
  private String link;

  //----------Getters&Setters-----------

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String content) {
    this.description = content;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

}
