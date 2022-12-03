package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
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
  @JoinColumn(name = "author_id")
  private User author;

  @ManyToMany(cascade = CascadeType.ALL)
  private List<User> upvoters;

  public void setScore(List<User> likers) {
    setUpvoters(likers);
    setScore(likers.size());
  }

  public void setScore(int score) {
    this.score = score;
  }
}
