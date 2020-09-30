package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalTime;

public class EventSoccerApiDto {

  @JsonProperty("idEvent")
  private Long externalId;
  @JsonProperty("strEvent")
  private String name;
  @JsonProperty("strHomeTeam")
  private String homeTeamName;
  @JsonProperty("strAwayTeam")
  private String awayTeamName;
  @JsonProperty("intHomeScore")
  private Integer homeScore;
  @JsonProperty("intRound")
  private int roundNumber;
  @JsonProperty("intAwayScore")
  private Integer awayScore;
  @JsonProperty("dateEvent")
  private LocalDate date;
  @JsonProperty("strTime")
  private LocalTime time;
  @JsonProperty("strPostponed")
  private String isPostponed;
  @JsonIgnore
  private boolean postponed;

  //----------Getters&Setters-----------


  public Long getExternalId() {
    return externalId;
  }

  public void setExternalId(Long externalId) {
    this.externalId = externalId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public int getRoundNumber() {
    return roundNumber;
  }

  public void setRoundNumber(int roundNumber) {
    this.roundNumber = roundNumber;
  }

  public Integer getAwayScore() {
    return awayScore;
  }

  public void setAwayScore(Integer awayScore) {
    this.awayScore = awayScore;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public LocalTime getTime() {
    return time;
  }

  public void setTime(LocalTime time) {
    this.time = time;
  }

  public String getIsPostponed() {
    return isPostponed;
  }

  public void setIsPostponed(String isPostponed) {
    this.isPostponed = isPostponed;
  }

  public boolean isPostponed() {
    return postponed;
  }

  public void setPostponed(boolean postponed) {
    this.postponed = postponed;
  }
}
