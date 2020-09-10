package com.sportapp.demo.models.social;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "entries_comments")
public class EntryComment extends Comment {

  @ManyToOne(cascade = CascadeType.ALL)
  private Entry entry;

  public Entry getEntry() {
    return entry;
  }

  public void setEntry(Entry entry) {
    this.entry = entry;
  }
}
