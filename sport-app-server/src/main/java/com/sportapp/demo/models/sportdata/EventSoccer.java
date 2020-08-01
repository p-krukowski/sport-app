package com.sportapp.demo.models.sportdata;


import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
public class EventSoccer extends Event {

    private String homeTeamName;
    private String awayTeamName;
    private Integer homeScore;
    private Integer awayScore;

    @ManyToOne
    private RoundSoccer round;

    @ManyToOne
    private LeagueSoccer league;

    @ManyToOne
    private SeasonSoccer season;

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

    public RoundSoccer getRound() {
        return round;
    }

    public void setRound(RoundSoccer round) {
        this.round = round;
    }

    public LeagueSoccer getLeague() {
        return league;
    }

    public void setLeague(LeagueSoccer league) {
        this.league = league;
    }

    public SeasonSoccer getSeason() {
        return season;
    }

    public void setSeason(SeasonSoccer season) {
        this.season = season;
    }
}
