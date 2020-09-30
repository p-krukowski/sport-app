package com.sportapp.demo.models.sportdata;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class EventSoccer extends Event {

  private Long externalId;
  private String homeTeamName;
  private String awayTeamName;
  private Integer homeScore;
  private Integer awayScore;

  private int roundNumber;

  @ManyToOne
  private LeagueSoccer league;

  //----------Getters&Setters-----------

  public Long getExternalId() {
    return externalId;
  }

  public void setExternalId(Long externalId) {
    this.externalId = externalId;
  }

  public String getHomeTeamName() {
    return homeTeamName;
  }

  public void setHomeTeamName(String homeTeamName) {
    this.homeTeamName = homeTeamName;
  }

  public String getAwayTeamName() {
    return awayTeamName;
  }

  public void setAwayTeamName(String awayTeamName) {
    this.awayTeamName = awayTeamName;
  }

  public Integer getHomeScore() {
    return homeScore;
  }

  public void setHomeScore(Integer homeScore) {
    this.homeScore = homeScore;
  }

  public Integer getAwayScore() {
    return awayScore;
  }

  public void setAwayScore(Integer awayScore) {
    this.awayScore = awayScore;
  }

  public int getRoundNumber() {
    return roundNumber;
  }

  public void setRoundNumber(int roundNumber) {
    this.roundNumber = roundNumber;
  }

  public LeagueSoccer getLeague() {
    return league;
  }

  public void setLeague(LeagueSoccer league) {
    this.league = league;
  }

}
