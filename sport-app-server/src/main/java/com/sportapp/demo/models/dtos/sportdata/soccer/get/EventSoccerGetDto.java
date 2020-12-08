package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class EventSoccerGetDto {

  private String homeTeamName;
  private String awayTeamName;
  private Integer homeScore;
  private Integer awayScore;
  private LocalDate date;
  private LocalTime time;
  private LocalDateTime dateTime;
  private int roundNumber;

  public EventSoccerGetDto() {
  }

  public EventSoccerGetDto(String homeTeamName, String awayTeamName, Integer homeScore,
      Integer awayScore, LocalDate date, LocalTime time, LocalDateTime dateTime, int roundNumber) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
    this.date = date;
    this.time = time;
    this.dateTime = dateTime;
    this.roundNumber = roundNumber;
  }

  //----------Getters&Setters-----------

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

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
  public LocalTime getTime() {
    return time;
  }

  public void setTime(LocalTime time) {
    this.time = time;
  }

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }

  public int getRoundNumber() {
    return roundNumber;
  }

  public void setRoundNumber(int roundNumber) {
    this.roundNumber = roundNumber;
  }
}
