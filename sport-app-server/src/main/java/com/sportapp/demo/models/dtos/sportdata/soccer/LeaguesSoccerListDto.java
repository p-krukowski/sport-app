package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaguesSoccerListDto {

  @JsonProperty("leagues")
  List<LeagueSoccerApiDto> leagues;

}
