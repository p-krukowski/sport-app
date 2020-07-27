package com.sportapp.demo.models.sportdata;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Event {

    @Id
    private Long id;
    private String name;
    private String date;
    private String postponed;

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

    public String getPostponed() {
        return postponed;
    }

    public void setPostponed(String postponed) {
        this.postponed = postponed;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String dateEvent) {
        this.date = dateEvent;
    }
}
