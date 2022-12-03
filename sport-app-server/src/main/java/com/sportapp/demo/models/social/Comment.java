package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class Comment extends Post {

  @ManyToMany
  private List<User> downvoters;

}
