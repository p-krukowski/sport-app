package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import java.util.List;

public class TableSoccerGetDto {

    private List<TeamScoreSoccerGetDto> teams;

    public List<TeamScoreSoccerGetDto> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamScoreSoccerGetDto> teams) {
        this.teams = teams;
    }
}
