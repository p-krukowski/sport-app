package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventSoccerApiDto {

  @JsonProperty("idEvent")
  private Long externalId;

  @JsonProperty("strEvent")
  private String name;

  @JsonProperty("strHomeTeam")
  private String homeTeamName;

  @JsonProperty("strAwayTeam")
  private String awayTeamName;

  @JsonProperty("intHomeScore")
  private Integer homeScore;

  @JsonProperty("intRound")
  private int roundNumber;

  @JsonProperty("intAwayScore")
  private Integer awayScore;

  @JsonProperty("dateEvent")
  private LocalDate date;

  @JsonProperty("strTime")
  private LocalTime time;

  @JsonProperty("strPostponed")
  private String isPostponed;

  @JsonIgnore
  private boolean postponed;
}
