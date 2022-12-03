package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TeamScoreSoccerBasicsGetDto {

  private String name;
  private int played;
  private int goalsFor;
  private int total;

}
