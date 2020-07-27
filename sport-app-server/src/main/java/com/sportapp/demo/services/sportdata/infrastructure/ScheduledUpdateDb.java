package com.sportapp.demo.services.sportdata.infrastructure;

import com.sportapp.demo.models.sportdata.*;
import com.sportapp.demo.services.sportdata.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class ScheduledUpdateDb {

    private static final int MINUTE_IN_MS = 60_000;
    private static final int DAY_IN_MS = 86_400_000;

    private static final int LEAGUES_UPDATE_TIME = 5; //number of days
    private static final int TABLE_UPDATE_TIME = 30; //number of minutes
    private static final int ROUND_UPDATE_TIME = 5; //number of minutes

    SportApiCommunication sportApiCommunication;
    LeagueSoccerService leagueSoccerService;
    SeasonSoccerService seasonSoccerService;
    TeamScoreSoccerService teamScoreSoccerService;
    EventSoccerService eventSoccerService;
    RoundSoccerService roundSoccerService;

    @Autowired
    public ScheduledUpdateDb(SportApiCommunication sportApiCommunication, LeagueSoccerService leagueSoccerService,
            SeasonSoccerService seasonSoccerService,
                             TeamScoreSoccerService teamScoreSoccerService,
                             RoundSoccerService roundSoccerService,
                             EventSoccerService eventSoccerService) {
        this.sportApiCommunication = sportApiCommunication;
        this.leagueSoccerService = leagueSoccerService;
        this.seasonSoccerService = seasonSoccerService;
        this.teamScoreSoccerService = teamScoreSoccerService;
        this.roundSoccerService = roundSoccerService;
        this.eventSoccerService = eventSoccerService;
    }

//    @Scheduled(fixedRate = LEAGUES_UPDATE_TIME*DAY_IN_MS)
    public void updateLeagues() {
        leagueSoccerService.saveAll(sportApiCommunication.fetchLeaguesSoccerFromApi());
        updateSeasons();
    }

    private void updateSeasons() {
        leagueSoccerService.findAll().forEach(league -> {
            if(seasonSoccerService.findByLeagueAndSeason(league, league.getCurrentSeason()) == null) {
                SeasonSoccer season = new SeasonSoccer();
                season.setSeason(league.getCurrentSeason());
                season.setLeague(league);
                seasonSoccerService.save(season);
            }
        });
    }

    //@Scheduled(fixedRate = TABLE_UPDATE_TIME*MINUTE_IN_MS)
    public void updateTeams() {
        seasonSoccerService.findAll().forEach(this::updateSeasonTeams);
    }

    private void updateSeasonTeams(SeasonSoccer season) {
        List<TeamScoreSoccer> teams = sportApiCommunication
                .fetchTeamScoreSoccerListFromApi(season.getLeague().getId());
        teams.forEach(team -> {
            TeamScoreSoccer teamFromDb = teamScoreSoccerService.findByTeamIdAndSeason(team.getTeamId(), season);
            if(teamFromDb != null) {
                team.setId(teamFromDb.getId());
            }
            team.setSeason(season);
        });
        teamScoreSoccerService.saveAllTeamsToDb(teams);
    }

//    @Scheduled(fixedRate = LEAGUES_UPDATE_TIME*DAY_IN_MS)
    public void updateRounds() {
        seasonSoccerService.findAll().forEach(this::updateSeasonRounds);
    }

    private void updateSeasonRounds(SeasonSoccer season) {
        List<RoundSoccer> rounds = sportApiCommunication
                .fetchRoundsSoccerFromApi(season.getLeague().getId());
        rounds.forEach(round -> {
            RoundSoccer roundFromDb = roundSoccerService.findByRoundNumberAndSeason(round.getRoundNumber(), season);
            if(roundFromDb != null) {
                round.setId(roundFromDb.getId());
            } else {
                round.setEvents(null);
            }
            round.setSeason(season);
        });
        roundSoccerService.saveAllRoundsToDb(rounds);
        updateEvents();
    }

    private void updateEvents() {
        try {
            roundSoccerService.findAll().forEach(this::updateRoundEvents);
        } catch (NullPointerException e) {
            System.out.println("No rounds available for events update");
        }
    }

    private void updateRoundEvents(RoundSoccer round) {
        List<EventSoccer> events = sportApiCommunication.fetchEventsSoccerFromApi(round);
        events.forEach(event -> event.setRound(round));
        eventSoccerService.saveAllToDb(events);
    }

//    @Scheduled(fixedRate = ROUND_UPDATE_TIME*MINUTE_IN_MS)
    public void updateTodayEvents() {
        eventSoccerService
                .findAllByDateEvent(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .forEach(this::updateEvent);
    }

    private void updateEvent(EventSoccer eventFromDb) {
        EventSoccer event = sportApiCommunication.fetchEventSoccerFromApi(eventFromDb);
        event.setRound(eventFromDb.getRound());
        eventSoccerService.saveToDb(event);
    }

}
