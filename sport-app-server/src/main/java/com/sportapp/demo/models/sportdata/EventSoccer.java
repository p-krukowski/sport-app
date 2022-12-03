package com.sportapp.demo.models.sportdata;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "event_soccer")
@Getter
@Setter
public class EventSoccer extends Event {

  private Long externalId;
  private String homeTeamName;
  private String awayTeamName;
  private Integer homeScore;
  private Integer awayScore;

  private int roundNumber;

  @ManyToOne
  private LeagueSoccer league;

}
