package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeagueSoccerApiDto {

  @JsonProperty("strCurrentSeason")
  private String currentSeason;

}
