package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.RoundSoccerService;
import com.sportapp.demo.services.sportdata.SeasonSoccerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("sport/events")
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

    @GetMapping("/l={leagueId}&d={date}")
    public List<EventSoccerGetDto> fetchAllEventsByDateInLeague(@PathVariable Long leagueId,
                                                                @PathVariable String date) {
        List<EventSoccer> events = new ArrayList<>();
        List<RoundSoccer> rounds = seasonSoccerService.findByLeagueAndSeasonOrNew(leagueId).getRounds();
        rounds.forEach(
                round -> events.addAll(round.getEvents().stream()
                        .filter(event -> event.getDate().equals(date)).collect(Collectors.toList())));
        return convertToListDto(events);
    }

    @GetMapping("/l={leagueId}&r={roundNumber}")
    public List<EventSoccerGetDto> fetchAllRoundEventsInLeague(@PathVariable Long leagueId,
                                                               @PathVariable int roundNumber) {
        SeasonSoccer season = seasonSoccerService.findByLeagueAndSeasonOrNew(leagueId);
        RoundSoccer round = new RoundSoccer();
        try {
            round = findRoundBySeasonAndRoundNumber(season, roundNumber);
        } catch (NullPointerException e) {
            round.setEvents(new ArrayList<>());
        }
        return convertToListDto(round.getEvents());
    }

    private RoundSoccer findRoundBySeasonAndRoundNumber(SeasonSoccer season, int roundNumber) {
        return season.getRounds()
                .stream()
                .filter(roundSoccer -> roundSoccer.getRoundNumber() == roundNumber)
                .findFirst()
                .orElse(new RoundSoccer());
    }

    private List<EventSoccerGetDto> convertToListDto(List<EventSoccer> events) {
        Type typeMap = new TypeToken<List<EventSoccerGetDto>>() {
        }.getType();
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
        Type typeMap = new TypeToken<EventSoccerGetDto>() {
        }.getType();
        return modelMapper.map(event, typeMap);
    }
}
