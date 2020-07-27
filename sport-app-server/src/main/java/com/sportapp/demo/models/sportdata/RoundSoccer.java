package com.sportapp.demo.models.sportdata;

import javax.persistence.*;
import java.util.List;

@Entity
public class RoundSoccer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int roundNumber;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "round")
    private List<EventSoccer> events;

    @ManyToOne
    private SeasonSoccer season;

    //----------Getters&Setters-----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SeasonSoccer getSeason() {
        return season;
    }

    public void setSeason(SeasonSoccer season) {
        this.season = season;
    }

    public List<EventSoccer> getEvents() {
        return events;
    }

    public void setEvents(List<EventSoccer> events) {
        this.events = events;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }
}
