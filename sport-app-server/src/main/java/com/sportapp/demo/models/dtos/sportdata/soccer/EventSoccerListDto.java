package com.sportapp.demo.models.dtos.sportdata.soccer;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class EventSoccerListDto {

    @JsonProperty("events")
    List<EventSoccerApiDto> events;

    public List<EventSoccerApiDto> getEvents() {
        return events;
    }

    public void setEvents(List<EventSoccerApiDto> events) {
        this.events = events;
    }
}
