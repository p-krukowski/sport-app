package com.sportapp.demo.models.sportdata;

import javax.persistence.*;
import java.util.List;

@Entity
public class SeasonSoccer extends Season {

    private String season;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "season")
    private List<TeamScoreSoccer> teams;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "season")
    private List<RoundSoccer> rounds;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "season")
    private List<EventSoccer> events;

    @ManyToOne
    private LeagueSoccer league;

    //----------Getters&Setters-----------

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public List<TeamScoreSoccer> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamScoreSoccer> teams) {
        this.teams = teams;
    }

    public LeagueSoccer getLeague() {
        return league;
    }

    public void setLeague(LeagueSoccer league) {
        this.league = league;
    }

    public List<RoundSoccer> getRounds() {
        return rounds;
    }

    public void setRounds(List<RoundSoccer> rounds) {
        this.rounds = rounds;
    }

    public List<EventSoccer> getEvents() {
        return events;
    }

    public void setEvents(List<EventSoccer> events) {
        this.events = events;
    }
}
