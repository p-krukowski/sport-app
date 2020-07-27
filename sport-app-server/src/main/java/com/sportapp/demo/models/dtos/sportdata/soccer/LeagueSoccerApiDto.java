package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LeagueSoccerApiDto {

    @JsonProperty("idLeague")
    private Long id;
    @JsonProperty("strLeague")
    private String name;
    @JsonProperty("strSport")
    private String discipline;
    @JsonProperty("strLeagueAlternate")
    private String nameAlternate;
    @JsonProperty("strCurrentSeason")
    private String currentSeason;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public String getNameAlternate() {
        return nameAlternate;
    }

    public void setNameAlternate(String nameAlternate) {
        this.nameAlternate = nameAlternate;
    }

    public String getCurrentSeason() {
        return currentSeason;
    }

    public void setCurrentSeason(String currentSeason) {
        this.currentSeason = currentSeason;
    }
}
