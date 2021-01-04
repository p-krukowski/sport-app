package com.sportapp.demo.services.mappers;

import com.sportapp.demo.models.dtos.sportdata.soccer.EventSoccerApiDto;
import com.sportapp.demo.models.sportdata.EventSoccer;

public class EventSoccerMapper {

  private EventSoccerMapper() {
  }

  public static EventSoccer mapDtoToEntity(EventSoccerApiDto eventDto) {
    EventSoccer event = new EventSoccer();
    event.setName(eventDto.getName());
    event.setDate(eventDto.getDate());
    event.setTime(eventDto.getTime());
    if (eventDto.getIsPostponed().equals("yes")) {
      event.setPostponed(true);
    }
    event.setExternalId(eventDto.getExternalId());
    event.setHomeTeamName(eventDto.getHomeTeamName());
    event.setAwayTeamName(eventDto.getAwayTeamName());
    event.setHomeScore(eventDto.getHomeScore());
    event.setAwayScore(eventDto.getAwayScore());
    event.setRoundNumber(eventDto.getRoundNumber());
    return event;
  }
}
