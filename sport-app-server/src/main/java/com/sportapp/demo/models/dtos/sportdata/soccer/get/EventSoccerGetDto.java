package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import java.time.LocalDate;

public class EventSoccerGetDto {

    private String homeTeamName;
    private String awayTeamName;
    private int homeScore;
    private int awayScore;
    private LocalDate date;

    public EventSoccerGetDto() {
    }

    public EventSoccerGetDto(String homeTeamName, String awayTeamName, int homeScore, int awayScore, LocalDate date) {
        this.homeTeamName = homeTeamName;
        this.awayTeamName = awayTeamName;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.date = date;
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

    public int getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

}
