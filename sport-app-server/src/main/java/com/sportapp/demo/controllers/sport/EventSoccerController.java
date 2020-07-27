package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.SeasonSoccerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("sport/events")
public class EventSoccerController {

    EventSoccerService eventSoccerService;
    LeagueSoccerService leagueSoccerService;
    SeasonSoccerService seasonSoccerService;
    ModelMapper modelMapper;

    @Autowired
    public EventSoccerController(EventSoccerService eventSoccerService, ModelMapper modelMapper,
                                 LeagueSoccerService leagueSoccerService, SeasonSoccerService seasonSoccerService) {
        this.eventSoccerService = eventSoccerService;
        this.modelMapper = modelMapper;
        this.leagueSoccerService = leagueSoccerService;
        this.seasonSoccerService = seasonSoccerService;
    }

    @GetMapping("/l={leagueId}&r={roundNumber}")
    public List<EventSoccerGetDto> fetchAllRoundEventsInLeague(@PathVariable Long leagueId,
                                                               @PathVariable int roundNumber) {
        SeasonSoccer season = seasonSoccerService.findByLeagueAndSeasonOrNew(leagueId);
        RoundSoccer round = season.getRounds()
                .stream()
                .filter(roundSoccer -> roundSoccer.getRoundNumber() == roundNumber)
                .findFirst()
                .orElse(new RoundSoccer());
        return convertToListDto(round.getEvents());
    }

    private List<EventSoccerGetDto> convertToListDto(List<EventSoccer> events) {
        Type typeMap = new TypeToken<List<EventSoccerGetDto>>() {}.getType();
        return modelMapper.map(events, typeMap);
    }

    @GetMapping("/e/{eventId}")
    public EventSoccerGetDto fetchEvent(@PathVariable Long eventId) {
        return convertToDto(getEvent(eventId));
    }

    private EventSoccer getEvent(Long eventId) {
        EventSoccer event;
        try {
            event = eventSoccerService.findById(eventId);
        } catch (NullPointerException e) {
            event = new EventSoccer();
        }
        return event;
    }

    private EventSoccerGetDto convertToDto(EventSoccer event) {
        Type typeMap = new TypeToken<EventSoccerGetDto>() {}.getType();
        return modelMapper.map(event, typeMap);
    }
}
