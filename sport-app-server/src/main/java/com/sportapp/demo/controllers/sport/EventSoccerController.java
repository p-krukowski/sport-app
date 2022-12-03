package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/soccer/events")
@RequiredArgsConstructor
class EventSoccerController {

  private final EventSoccerService eventSoccerService;

  @GetMapping("/recent/l={leagueId}")
  List<EventSoccerGetDto> fetchRecentEventsByLeague(@PathVariable Long leagueId) {
    return eventSoccerService.findRecentByLeagueId(leagueId);
  }

  @GetMapping("/next/l={leagueId}")
  List<EventSoccerGetDto> fetchNextEventsByLeague(@PathVariable Long leagueId) {
    return eventSoccerService.findNextByLeagueId(leagueId);
  }

  @GetMapping("/l={leagueId}&r={roundNr}")
  List<EventSoccerGetDto> fetchEventsByLeagueIdAndRoundNr(@PathVariable Long leagueId, @PathVariable int roundNr) {
    return eventSoccerService.findEventsDtosByLeagueIdAndRoundNr(leagueId, roundNr);
  }
}
