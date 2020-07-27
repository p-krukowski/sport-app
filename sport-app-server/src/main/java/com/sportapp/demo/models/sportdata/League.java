package com.sportapp.demo.models.sportdata;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class League {

    @Id
    private Long id;
    private String name;
    private String nameAlternate;
    private String currentSeason;
    private String discipline;

    //----------Getters&Setters-----------


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

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String disciplineName) {
        this.discipline = disciplineName;
    }
}
