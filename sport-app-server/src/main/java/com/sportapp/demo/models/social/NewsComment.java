package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "news_comment")
@Getter
@Setter
public class NewsComment extends Comment {

  @ManyToOne
  @JoinColumn(name = "news_id", nullable = false)
  private News news;

  @OneToMany(mappedBy = "comment")
  private List<NewsCommentAnswer> answers;

}
