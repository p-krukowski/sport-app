package com.sportapp.demo.models.sportdata;

import javax.persistence.*;
import java.util.List;

@Entity
public class LeagueSoccer extends League {

    @OneToMany(mappedBy = "league")
    private List<SeasonSoccer> seasons;

    @OneToMany(mappedBy = "league")
    private List<TeamScoreSoccer> teamsScores;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "league")
    private List<EventSoccer> events;
    
    //----------Getters&Setters-----------


    public List<SeasonSoccer> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<SeasonSoccer> seasons) {
        this.seasons = seasons;
    }

    public List<TeamScoreSoccer> getTeamsScores() {
        return teamsScores;
    }

    public void setTeamsScores(List<TeamScoreSoccer> teamsScores) {
        this.teamsScores = teamsScores;
    }

    public List<EventSoccer> getEvents() {
        return events;
    }

    public void setEvents(List<EventSoccer> events) {
        this.events = events;
    }
}
