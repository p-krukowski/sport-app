package com.sportapp.demo.models.social;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "entries_comments")
@Getter
@Setter
public class EntryComment extends Comment {

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "entry_id", nullable = false)
  private Entry entry;

}
