package com.sportapp.demo.services.sportdata.infrastructure.soccer;

import com.sportapp.demo.models.dtos.sportdata.soccer.EventSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.RoundSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.TeamScoreSoccerListApiDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.RoundSoccerService;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SoccerUpdateService {

  SoccerApiCommunication soccerApiCommunication;
  LeagueSoccerService leagueSoccerService;
  TeamScoreSoccerService teamScoreSoccerService;
  EventSoccerService eventSoccerService;
  RoundSoccerService roundSoccerService;
  ModelMapper modelMapper;

  public SoccerUpdateService(SoccerApiCommunication soccerApiCommunication,
      LeagueSoccerService leagueSoccerService,
      TeamScoreSoccerService teamScoreSoccerService,
      RoundSoccerService roundSoccerService,
      EventSoccerService eventSoccerService,
      ModelMapper modelMapper) {
    this.soccerApiCommunication = soccerApiCommunication;
    this.leagueSoccerService = leagueSoccerService;
    this.teamScoreSoccerService = teamScoreSoccerService;
    this.roundSoccerService = roundSoccerService;
    this.eventSoccerService = eventSoccerService;
    this.modelMapper = modelMapper;
  }

  @Transactional
  public void updateLeagues() {
    List<LeagueSoccer> leagueSoccerList = leagueSoccerService.findAll();
    leagueSoccerList
        .forEach(leagueSoccer -> {
          String fetchedSeason = soccerApiCommunication
              .fetchLeagueCurrentSeason(leagueSoccer.getExternalId());
          if (!fetchedSeason.equals(leagueSoccer.getCurrentSeason())) {
            updateEntireLeague(leagueSoccer, fetchedSeason);
          }
        });
  }

  @Transactional
  public void updateTeams() {
    List<LeagueSoccer> leagueSoccerList = leagueSoccerService.findAll();
    leagueSoccerList.forEach(this::updateTeamsInLeague);
  }

  @Transactional
  public void updateTodayEvents() {
    List<EventSoccer> eventSoccerList = eventSoccerService.findAllByDate(LocalDate.now());
    eventSoccerList.forEach(this::updateEvent);
    eventSoccerService.saveAll(eventSoccerList);
  }

  @Transactional
  public void updateYesterdayEvents() {
    List<EventSoccer> eventSoccerList = eventSoccerService
        .findAllByDate(LocalDate.now().minusDays(1));
    eventSoccerList.forEach(this::updateEvent);
    eventSoccerService.saveAll(eventSoccerList);
  }

  private void updateEntireLeague(LeagueSoccer leagueSoccer, String fetchedSeason) {
    leagueSoccer = updateLeague(leagueSoccer, fetchedSeason);
    updateLeagueRoundsAndEvents(leagueSoccer);
    updateLeagueTeams(leagueSoccer);
  }

  private LeagueSoccer updateLeague(LeagueSoccer leagueSoccer, String fetchedSeason) {
    leagueSoccer.setCurrentSeason(fetchedSeason);
    return leagueSoccerService.save(leagueSoccer);
  }

  private void updateLeagueRoundsAndEvents(LeagueSoccer leagueSoccer) {
    roundSoccerService.deleteAllByLeagueId(leagueSoccer.getId());
    List<RoundSoccer> roundSoccerList = fetchLeagueRoundsWithEvents(leagueSoccer);
    roundSoccerList.forEach(round -> {
      List<EventSoccer> eventSoccerList = round.getEvents();
      setEventsAfterUpdate(leagueSoccer, round, eventSoccerList);
      setRoundAfterUpdate(round, eventSoccerList, leagueSoccer);
    });
    roundSoccerService.saveAll(roundSoccerList);
  }

  private void updateLeagueTeams(LeagueSoccer leagueSoccer) {
    teamScoreSoccerService.deleteAllByLeagueId(leagueSoccer.getId());
    teamScoreSoccerService.saveAll(fetchLeagueTeams(leagueSoccer));
  }

  private List<RoundSoccer> fetchLeagueRoundsWithEvents(LeagueSoccer leagueSoccer) {
    List<RoundSoccer> rounds = new ArrayList<>();
    fetchRoundsByIteratingApi(leagueSoccer, rounds);
    return rounds;
  }

  private void fetchRoundsByIteratingApi(LeagueSoccer leagueSoccer, List<RoundSoccer> rounds) {
    for (int roundNumber = 1; true; roundNumber++) {
      RoundSoccerApiDto roundDto = soccerApiCommunication
          .fetchRound(roundNumber, leagueSoccer.getExternalId());
      if (roundDto.getEvents() != null) {
        RoundSoccer round = convertRoundToEntity(roundDto);
        round.setRoundNumber(roundNumber);
        rounds.add(round);
      } else {
        break;
      }
    }
  }

  private void setEventsAfterUpdate(LeagueSoccer leagueSoccer, RoundSoccer round,
      List<EventSoccer> eventSoccerList) {
    eventSoccerList.forEach(eventSoccer -> {
      eventSoccer.setId(null);
      eventSoccer.setLeague(leagueSoccer);
      eventSoccer.setRound(round);
    });
  }

  private void setRoundAfterUpdate(RoundSoccer round, List<EventSoccer> eventSoccerList,
      LeagueSoccer leagueSoccer) {
    round.setEvents(eventSoccerList);
    round.setLeague(leagueSoccer);
  }

  private List<TeamScoreSoccer> fetchLeagueTeams(LeagueSoccer leagueSoccer) {
    List<TeamScoreSoccer> teams = convertTeamsToEntities(
        soccerApiCommunication.fetchLeagueTeams(leagueSoccer));
    teams.forEach(team -> team.setLeague(leagueSoccer));
    return teams;
  }

  private RoundSoccer convertRoundToEntity(RoundSoccerApiDto round) {
    return modelMapper.map(round, RoundSoccer.class);
  }

  private List<TeamScoreSoccer> convertTeamsToEntities(
      TeamScoreSoccerListApiDto teamScoreSoccerListApiDto) {
    List<TeamScoreSoccer> teams = new ArrayList<>();
    teamScoreSoccerListApiDto.getTeams().forEach(team ->
        teams.add(modelMapper.map(team, TeamScoreSoccer.class)));
    return teams;
  }

  private void updateTeamsInLeague(LeagueSoccer leagueSoccer) {
    List<TeamScoreSoccer> teams = leagueSoccer.getTeamsScores();
    List<TeamScoreSoccer> fetchedTeams = fetchLeagueTeams(leagueSoccer);
    teams.forEach(team -> setTeamIfPresent(fetchedTeams, team));
    teamScoreSoccerService.saveAll(teams);
  }

  private void setTeamIfPresent(List<TeamScoreSoccer> fetchedTeams, TeamScoreSoccer team) {
    Optional<TeamScoreSoccer> fetchedTeamOpt = fetchedTeams
        .stream()
        .filter(t -> t.getTeamId().equals(team.getTeamId()))
        .findFirst();
    if (fetchedTeamOpt.isPresent()) {
      TeamScoreSoccer fetchedTeam = fetchedTeamOpt.get();
      setTeamAfterUpdate(team, fetchedTeam);
    }
  }

  private void setTeamAfterUpdate(TeamScoreSoccer team, TeamScoreSoccer fetchedTeam) {
    team.setGoalsAgainst(fetchedTeam.getGoalsAgainst());
    team.setGoalsDifference(fetchedTeam.getGoalsDifference());
    team.setGoalsFor(fetchedTeam.getGoalsFor());
    team.setTotal(fetchedTeam.getTotal());
    team.setDraw(fetchedTeam.getDraw());
    team.setLoss(fetchedTeam.getLoss());
    team.setPlayed(fetchedTeam.getPlayed());
    team.setWin(fetchedTeam.getWin());
  }

  private EventSoccer updateEvent(EventSoccer event) {
    Optional<EventSoccerApiDto> fetchedEventDtoOpt = soccerApiCommunication
        .fetchEvent(event.getExternalId()).getEvents().stream().findAny();
    if (fetchedEventDtoOpt.isPresent()) {
      EventSoccerApiDto fetchedEventDto = fetchedEventDtoOpt.get();
      EventSoccer fetchedEvent = convertEventToEntity(fetchedEventDto);
      setEventAfterUpdate(event, fetchedEvent);
      eventSoccerService.save(event);
    }
    return event;
  }

  private void setEventAfterUpdate(EventSoccer event, EventSoccer fetchedEvent) {
    event.setAwayScore(fetchedEvent.getAwayScore());
    event.setHomeScore(fetchedEvent.getHomeScore());
    event.setPostponed(fetchedEvent.getPostponed());
  }

  private EventSoccer convertEventToEntity(EventSoccerApiDto eventSoccer) {
    return modelMapper.map(eventSoccer, EventSoccer.class);
  }
}
