package com.sportapp.demo.models.dtos.social;

import com.sportapp.demo.models.social.Rank;

public class UserPropsGetDto {

    private Rank rank;
    private int score;

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}
