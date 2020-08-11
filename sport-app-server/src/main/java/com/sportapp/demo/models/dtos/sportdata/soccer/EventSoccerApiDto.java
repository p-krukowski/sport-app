package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class EventSoccerApiDto {

    @JsonProperty("idEvent")
    private Long id;
    @JsonProperty("strEvent")
    private String name;
    @JsonProperty("strHomeTeam")
    private String homeTeamName;
    @JsonProperty("strAwayTeam")
    private String awayTeamName;
    @JsonProperty("intHomeScore")
    private Integer homeScore;
    @JsonProperty("intRound")
    private int round;
    @JsonProperty("intAwayScore")
    private Integer awayScore;
    @JsonProperty("dateEvent")
    private LocalDate date;
    @JsonProperty("strPostponed")
    private String postponed;


    //----------Getters&Setters-----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
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


    public String getPostponed() {
        return postponed;
    }

    public void setPostponed(String postponed) {
        this.postponed = postponed;
    }
}
