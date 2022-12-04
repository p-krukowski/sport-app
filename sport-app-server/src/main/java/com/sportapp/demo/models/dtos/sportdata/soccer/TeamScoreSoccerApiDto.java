package com.sportapp.demo.models.dtos.sportdata.soccer;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamScoreSoccerApiDto {

  @JsonProperty("strTeam")
  private String name;

  @JsonProperty("idTeam")
  private String teamId;

  @JsonProperty("intPlayed")
  private int played;

  @JsonProperty("intGoalsFor")
  private int goalsFor;

  @JsonProperty("intGoalsAgainst")
  private int goalsAgainst;

  @JsonProperty("intGoalsDifference")
  private int goalsDifference;

  @JsonProperty("intWin")
  private int win;

  @JsonProperty("intDraw")
  private int draw;

  @JsonProperty("intLoss")
  private int loss;

  @JsonProperty("intPoints")
  private int total;

}
