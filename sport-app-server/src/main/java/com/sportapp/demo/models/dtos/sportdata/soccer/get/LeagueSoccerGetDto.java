package com.sportapp.demo.models.dtos.sportdata.soccer.get;


public class LeagueSoccerGetDto {

    private Long id;
    private String discipline;
    private String name;
    private String nameAlternate;

    public LeagueSoccerGetDto() {
    }

    public LeagueSoccerGetDto(Long id, String discipline, String name, String nameAlternate) {
        this.id = id;
        this.discipline = discipline;
        this.name = name;
        this.nameAlternate = nameAlternate;
    }

    //----------Getters&Setters-----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
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

}
