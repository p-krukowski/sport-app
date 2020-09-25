package com.sportapp.demo.models.sportdata;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TeamScoreSoccer extends TeamScore {

  private int goalsFor;
  private int goalsAgainst;
  private int goalsDifference;
  private int total;

  @ManyToOne
  private LeagueSoccer league;

  //----------Getters&Setters-----------

  public int getGoalsFor() {
    return goalsFor;
  }

  public void setGoalsFor(int goalsFor) {
    this.goalsFor = goalsFor;
  }

  public int getGoalsAgainst() {
    return goalsAgainst;
  }

  public void setGoalsAgainst(int goalsAgainst) {
    this.goalsAgainst = goalsAgainst;
  }

  public int getGoalsDifference() {
    return goalsDifference;
  }

  public void setGoalsDifference(int goalsDifference) {
    this.goalsDifference = goalsDifference;
  }

  public int getTotal() {
    return total;
  }

  public void setTotal(int total) {
    this.total = total;
  }

  public LeagueSoccer getLeague() {
    return league;
  }

  public void setLeague(LeagueSoccer league) {
    this.league = league;
  }
}
