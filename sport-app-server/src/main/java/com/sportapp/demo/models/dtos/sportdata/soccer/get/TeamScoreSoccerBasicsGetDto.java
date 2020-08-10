package com.sportapp.demo.models.dtos.sportdata.soccer.get;

public class TeamScoreSoccerBasicsGetDto {

    private String name;
    private int played;
    private int goalsFor;
    private int total;

    public TeamScoreSoccerBasicsGetDto(String name, int played, int goalsFor, int total) {
        this.name = name;
        this.played = played;
        this.goalsFor = goalsFor;
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
