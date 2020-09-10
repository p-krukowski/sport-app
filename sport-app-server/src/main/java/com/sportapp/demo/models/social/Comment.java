package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Comment extends Post {

  @ManyToMany
  private List<User> downvoters;

  //----------Getters&Setters-----------

  public List<User> getDownvoters() {
    return downvoters;
  }

  public void setDownvoters(List<User> downvoters) {
    this.downvoters = downvoters;
  }

}
