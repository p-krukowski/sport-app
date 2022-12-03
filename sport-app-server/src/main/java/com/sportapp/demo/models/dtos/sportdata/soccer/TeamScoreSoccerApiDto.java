package com.sportapp.demo.models.dtos.sportdata.soccer;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamScoreSoccerApiDto {

  private String name;

  @JsonProperty("teamid")
  private String teamId;
  private int played;

  @JsonProperty("goalsfor")
  private int goalsFor;

  @JsonProperty("goalsagainst")
  private int goalsAgainst;

  @JsonProperty("goalsdifference")
  private int goalsDifference;
  private int win;
  private int draw;
  private int loss;
  private int total;

}
