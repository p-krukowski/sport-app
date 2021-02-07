package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

@MappedSuperclass
public class Post extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String content;
  private int score;
  private String imageUrl;

  @ManyToMany(cascade = CascadeType.ALL)
  private List<Tag> tags;

  @ManyToOne
  private User author;

  @ManyToMany(cascade = CascadeType.ALL)
  private List<User> upvoters;

  @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
  private List<Comment> comments;


  //----------Getters&Setters-----------

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String value) {
    this.content = value;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public void setScore(List<User> likers) {
    setUpvoters(likers);
    setScore(likers.size());
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public List<User> getUpvoters() {
    return upvoters;
  }

  public void setUpvoters(List<User> upvoters) {
    this.upvoters = upvoters;
  }

  public List<Tag> getTags() {
    return tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }
}
