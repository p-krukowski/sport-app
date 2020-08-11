package com.sportapp.demo.services.sportdata.infrastructure;

import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.services.sportdata.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
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

    //@Scheduled(fixedRate = LEAGUES_UPDATE_TIME*DAY_IN_MS)
    public void updateLeagues() {
        leagueSoccerService.saveAll(sportApiCommunication.fetchLeaguesSoccerFromApi());
        updateSeasons();
    }

    //@Scheduled(fixedRate = TABLE_UPDATE_TIME*MINUTE_IN_MS)
    public void updateTeams() {
        seasonSoccerService.findAll().forEach(this::updateSeasonTeams);
    }

    //@Scheduled(fixedRate = LEAGUES_UPDATE_TIME*DAY_IN_MS)
    public void updateRounds() {
        seasonSoccerService.findAll().forEach(this::updateSeasonRounds);
    }

    //@Scheduled(fixedRate = LEAGUES_UPDATE_TIME*DAY_IN_MS)
    public void updateEvents() {
        try {
            roundSoccerService.findAll().forEach(this::updateRoundEvents);
        } catch (NullPointerException e) {
            System.out.println("No rounds available for events update");
        }
    }

    @Scheduled(fixedRate = ROUND_UPDATE_TIME*MINUTE_IN_MS)
    public void updateTodayEvents() {
        eventSoccerService
                .findAllByDate(LocalDate.now())
                .forEach(this::updateEvent);
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

    private void updateSeasonTeams(SeasonSoccer season) {
        List<TeamScoreSoccer> teams = sportApiCommunication
                .fetchTeamScoreSoccerListFromApi(season.getLeague().getId());
        teams.forEach(team -> {
            TeamScoreSoccer teamFromDb = teamScoreSoccerService.findByTeamIdAndSeason(team.getTeamId(), season);
            if(teamFromDb != null) {
                team.setId(teamFromDb.getId());
            }
            team.setSeason(season);
            team.setLeague(season.getLeague());
        });
        teamScoreSoccerService.saveAllTeamsToDb(teams);
    }

    private void updateSeasonRounds(SeasonSoccer season) {
        List<RoundSoccer> rounds = sportApiCommunication
                .fetchRoundsSoccerFromApi(season.getLeague().getId());
        rounds.forEach(round -> {
            RoundSoccer roundFromDb = roundSoccerService.findByRoundNumberAndSeason(round.getRoundNumber(), season);
            if(roundFromDb != null) {
                round.setId(roundFromDb.getId());
            }
            round.setEvents(null);
            round.setSeason(season);
        });
        roundSoccerService.saveAllRoundsToDb(rounds);
    }

    private void updateRoundEvents(RoundSoccer round) {
        List<EventSoccer> events = sportApiCommunication.fetchEventsSoccerFromApi(round);
        events.forEach(event -> {
            event.setRound(round);
            event.setSeason(round.getSeason());
            event.setLeague(round.getSeason().getLeague());
        });
        eventSoccerService.saveAllToDb(events);
    }

    private void updateEvent(EventSoccer eventFromDb) {
        EventSoccer event = sportApiCommunication.fetchEventSoccerFromApi(eventFromDb);
        event.setRound(eventFromDb.getRound());
        event.setSeason(eventFromDb.getSeason());
        event.setLeague(eventFromDb.getLeague());
        eventSoccerService.saveToDb(event);
    }

}
