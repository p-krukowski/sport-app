package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TeamScoreSoccerGetDto {

  private String name;
  private int win;
  private int draw;
  private int loss;
  private int played;
  private int goalsFor;
  private int goalsAgainst;
  private int goalsDifference;
  private int total;

}
