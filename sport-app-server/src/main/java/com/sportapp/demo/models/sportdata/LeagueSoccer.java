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

}
