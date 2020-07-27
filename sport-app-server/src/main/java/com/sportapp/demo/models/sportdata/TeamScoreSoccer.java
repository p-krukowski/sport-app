package com.sportapp.demo.models.sportdata;

import javax.persistence.*;

@Entity
public class TeamScoreSoccer extends TeamScore {

    private int goalsFor;
    private int goalsAgainst;
    private int goalsDifference;
    private int total;

    @ManyToOne
    private SeasonSoccer season;

    //----------Getters&Setters-----------

    public SeasonSoccer getSeason() {
        return season;
    }

    public void setSeason(SeasonSoccer season) {
        this.season = season;
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
