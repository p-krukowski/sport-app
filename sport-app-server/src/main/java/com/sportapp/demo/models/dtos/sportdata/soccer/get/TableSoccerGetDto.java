package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import java.util.List;

public class TableSoccerGetDto {

    private List<TeamSoccerGetDto> teams;

    public List<TeamSoccerGetDto> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamSoccerGetDto> teams) {
        this.teams = teams;
    }
}
