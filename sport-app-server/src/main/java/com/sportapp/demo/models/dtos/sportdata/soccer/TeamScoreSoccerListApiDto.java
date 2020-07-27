package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TeamScoreSoccerListApiDto {

    @JsonProperty("table")
    private List<TeamScoreSoccerApiDto> teams;

    public List<TeamScoreSoccerApiDto> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamScoreSoccerApiDto> teams) {
        this.teams = teams;
    }
}
