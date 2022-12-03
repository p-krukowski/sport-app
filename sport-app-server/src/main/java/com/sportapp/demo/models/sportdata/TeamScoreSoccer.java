package com.sportapp.demo.models.sportdata;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "team_score_soccer")
@Getter
@Setter
public class TeamScoreSoccer extends TeamScore {

  private int goalsFor;
  private int goalsAgainst;
  private int goalsDifference;
  private int total;

  @ManyToOne
  private LeagueSoccer league;

}
