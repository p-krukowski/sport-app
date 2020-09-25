package com.sportapp.demo.models.sportdata;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class LeagueSoccer extends League {

  private Long externalId;

  @OneToMany(mappedBy = "league")
  private List<TeamScoreSoccer> teamsScores;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "league")
  private List<EventSoccer> events;

  @OneToMany(mappedBy = "league")
  private List<RoundSoccer> rounds;

  //----------Getters&Setters-----------

  public Long getExternalId() {
    return externalId;
  }

  public void setExternalId(Long externalId) {
    this.externalId = externalId;
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

  public List<RoundSoccer> getRounds() {
    return rounds;
  }

  public void setRounds(List<RoundSoccer> rounds) {
    this.rounds = rounds;
  }
}
