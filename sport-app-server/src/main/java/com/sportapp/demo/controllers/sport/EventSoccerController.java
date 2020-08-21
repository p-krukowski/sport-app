package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.RoundSoccerService;
import com.sportapp.demo.services.sportdata.SeasonSoccerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sport/soccer/events")
public class EventSoccerController {

    EventSoccerService eventSoccerService;
    LeagueSoccerService leagueSoccerService;
    SeasonSoccerService seasonSoccerService;
    RoundSoccerService roundSoccerService;
    ModelMapper modelMapper;

    @Autowired
    public EventSoccerController(EventSoccerService eventSoccerService, ModelMapper modelMapper,
                                 LeagueSoccerService leagueSoccerService, SeasonSoccerService seasonSoccerService,
                                 RoundSoccerService roundSoccerService) {
        this.eventSoccerService = eventSoccerService;
        this.modelMapper = modelMapper;
        this.leagueSoccerService = leagueSoccerService;
        this.seasonSoccerService = seasonSoccerService;
        this.roundSoccerService = roundSoccerService;
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
