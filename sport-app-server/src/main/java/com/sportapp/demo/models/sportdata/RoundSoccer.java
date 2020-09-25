package com.sportapp.demo.models.sportdata;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class RoundSoccer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int roundNumber;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "round", orphanRemoval = true)
  private List<EventSoccer> events;

  @ManyToOne
  private LeagueSoccer league;

  //----------Getters&Setters-----------

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public LeagueSoccer getLeague() {
    return league;
  }

  public void setLeague(LeagueSoccer league) {
    this.league = league;
  }
}
