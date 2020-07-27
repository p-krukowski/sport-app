package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class LeaguesSoccerListDto {

    @JsonProperty("leagues")
    List<LeagueSoccerApiDto> leagues;

    public List<LeagueSoccerApiDto> getLeagues() {
        return leagues;
    }

    public void setLeagues(List<LeagueSoccerApiDto> leagues) {
        this.leagues = leagues;
    }
}
