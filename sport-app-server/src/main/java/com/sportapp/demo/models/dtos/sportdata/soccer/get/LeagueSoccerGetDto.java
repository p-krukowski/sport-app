package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LeagueSoccerGetDto {

  private Long id;
  private String discipline;
  private String name;
  private String nameAlternate;

}
