package com.sportapp.demo.models.sportdata;

import javax.persistence.*;
import java.util.List;

@Entity
public class LeagueSoccer extends League {

    @OneToMany(mappedBy = "league")
    private List<SeasonSoccer> seasons;
    
    //----------Getters&Setters-----------


    public List<SeasonSoccer> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<SeasonSoccer> seasons) {
        this.seasons = seasons;
    }
}
