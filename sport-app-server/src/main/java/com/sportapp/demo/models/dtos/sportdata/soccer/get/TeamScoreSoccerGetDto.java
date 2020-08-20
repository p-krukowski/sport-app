package com.sportapp.demo.models.dtos.sportdata.soccer.get;

public class TeamScoreSoccerGetDto {

    private String name;
    private int win;
    private int draw;
    private int loss;
    private int played;
    private int goalsFor;
    private int goalsAgainst;
    private int goalsDifference;
    private int total;

    public TeamScoreSoccerGetDto(String name, int win, int draw, int loss,
                                 int played, int goalsFor, int goalsAgainst,
                                 int goalsDifference, int total) {
        this.name = name;
        this.win = win;
        this.draw = draw;
        this.loss = loss;
        this.played = played;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.goalsDifference = goalsDifference;
        this.total = total;
    }

    //----------Getters&Setters-----------

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
