package com.sportapp.demo.models.dtos.sportdata.soccer;


import com.fasterxml.jackson.annotation.JsonProperty;


public class TeamScoreSoccerApiDto {

    private String name;
    @JsonProperty("teamid")
    private String teamId;
    private int played;
    @JsonProperty("goalsfor")
    private int goalsFor;
    @JsonProperty("goalsagainst")
    private int goalsAgainst;
    @JsonProperty("goalsdifference")
    private int goalsDifference;
    private int win;
    private int draw;
    private int loss;
    private int total;

   public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getTeamId() {
        return teamId;
    }


    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public int getPlayed() {
        return played;
    }

    public void setPlayed(int played) {
        this.played = played;
    }

    public int getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(int goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

    public int getGoalsDifference() {
        return goalsDifference;
    }

    public void setGoalsDifference(int goalsDifference) {
        this.goalsDifference = goalsDifference;
    }

    public int getWin() {
        return win;
    }

    public void setWin(int win) {
        this.win = win;
    }

    public int getDraw() {
        return draw;
    }

    public void setDraw(int draw) {
        this.draw = draw;
    }

    public int getLoss() {
        return loss;
    }

    public void setLoss(int loss) {
        this.loss = loss;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
