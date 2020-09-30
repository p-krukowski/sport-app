package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/soccer/events")
public class EventSoccerController {

  EventSoccerService eventSoccerService;

  @Autowired
  public EventSoccerController(EventSoccerService eventSoccerService) {
    this.eventSoccerService = eventSoccerService;
  }

  @GetMapping("/recent/l={leagueId}")
  public List<EventSoccerGetDto> fetchRecentEventsByLeague(@PathVariable Long leagueId) {
    return eventSoccerService.findRecentByLeagueId(leagueId);
  }

  @GetMapping("/next/l={leagueId}")
  public List<EventSoccerGetDto> fetchNextEventsByLeague(@PathVariable Long leagueId) {
    return eventSoccerService.findNextByLeagueId(leagueId);
  }

  @GetMapping("/l={leagueId}&r={roundNr}")
  public List<EventSoccerGetDto> fetchEventsByLeagueIdAndRoundNr(@PathVariable Long leagueId,
      @PathVariable int roundNr) {
    return eventSoccerService.findEventsDtosByLeagueIdAndRoundNr(leagueId, roundNr);
  }
}
