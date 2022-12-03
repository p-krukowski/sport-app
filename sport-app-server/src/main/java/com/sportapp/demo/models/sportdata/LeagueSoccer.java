package com.sportapp.demo.models.sportdata;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "league_soccer")
@Getter
@Setter
public class LeagueSoccer extends League {

  private Long externalId;

  @OneToMany(mappedBy = "league")
  private List<TeamScoreSoccer> teamsScores;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "league")
  private List<EventSoccer> events;

}
