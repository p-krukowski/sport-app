package com.sportapp.demo.services.sportdata.infrastructure.soccer;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.sportdata.soccer.EventSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.EventSoccerListDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.RoundSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.TeamScoreSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.TeamScoreSoccerListApiDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.services.mappers.EventSoccerMapper;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

class SoccerUpdateServiceTest {

  @Mock
  SoccerApiCommunication soccerApiCommunication;
  @Mock
  LeagueSoccerService leagueSoccerService;
  @Mock
  EventSoccerService eventSoccerService;
  @Mock
  TeamScoreSoccerService teamScoreSoccerService;
  @Mock
  ModelMapper modelMapper;
  @InjectMocks
  SoccerUpdateService soccerUpdateService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @BeforeAll
  static void onStart() {
    Mockito.mockStatic(EventSoccerMapper.class);
  }

  @Test
  void shouldNotUpdateLeaguesWhenSeasonTheSame() {
    //given
    LeagueSoccer leagueSoccer = new LeagueSoccer();
    leagueSoccer.setId(1L);
    leagueSoccer.setCurrentSeason("2020");

    //when
    when(leagueSoccerService.findAll()).thenReturn(Collections.singletonList(leagueSoccer));
    when(soccerApiCommunication.fetchLeagueCurrentSeason(any())).thenReturn("2020");
    soccerUpdateService.updateLeagues();

    //then
    verify(eventSoccerService, times(0)).deleteAllByLeagueId(1L);
    verify(eventSoccerService, times(0)).saveAll(anyList());
    verify(leagueSoccerService, times(0)).save(any());
    verify(leagueSoccerService, times(0)).save(any());
    verify(teamScoreSoccerService, times(0)).deleteAllByLeagueId(1L);
    verify(teamScoreSoccerService, times(0)).saveAll(anyList());
  }

  @Test
  void shouldUpdateLeagueWhenSeasonIsDifferent() {
    //given
    LeagueSoccer leagueSoccer = new LeagueSoccer();
    leagueSoccer.setId(1L);
    leagueSoccer.setCurrentSeason("2020");
    leagueSoccer.setExternalId(4338L);
    RoundSoccerApiDto roundDto = new RoundSoccerApiDto();
    EventSoccerApiDto eventDto = new EventSoccerApiDto();
    eventDto.setIsPostponed("no");
    roundDto.setEvents(Collections.singletonList(eventDto));
    EventSoccer eventSoccer = new EventSoccer();
    eventSoccer.setDate(LocalDate.now());
    eventSoccer.setTime(LocalTime.now());
    TeamScoreSoccerApiDto teamScoreSoccerApiDto = new TeamScoreSoccerApiDto();
    TeamScoreSoccerListApiDto teamScoreSoccerListApiDto = new TeamScoreSoccerListApiDto();
    teamScoreSoccerListApiDto.setTeams(Collections.singletonList(teamScoreSoccerApiDto));

    //when
    when(leagueSoccerService.findAll()).thenReturn(Collections.singletonList(leagueSoccer));
    when(soccerApiCommunication.fetchLeagueCurrentSeason(any())).thenReturn("2021");
    when(leagueSoccerService.save(leagueSoccer)).thenReturn(leagueSoccer);
    when(soccerApiCommunication
        .fetchRound(anyInt(), any()))
        .thenReturn(roundDto);
    when(soccerApiCommunication.fetchRound(2, leagueSoccer.getExternalId()))
        .thenReturn(new RoundSoccerApiDto());
    when(soccerApiCommunication.fetchLeagueTeams(leagueSoccer))
        .thenReturn(teamScoreSoccerListApiDto);
    when(EventSoccerMapper.mapDtoToEntity(eventDto)).thenReturn(eventSoccer);
    when(modelMapper.map(teamScoreSoccerApiDto, TeamScoreSoccer.class))
        .thenReturn(new TeamScoreSoccer());
    soccerUpdateService.updateLeagues();

    //then
    verify(eventSoccerService, times(1)).deleteAllByLeagueId(1L);
    verify(eventSoccerService, times(1)).saveAll(anyList());
    verify(leagueSoccerService, times(1)).save(any());
    verify(leagueSoccerService, times(1)).save(any());
    verify(teamScoreSoccerService, times(1)).deleteAllByLeagueId(1L);
    verify(teamScoreSoccerService, times(1)).saveAll(anyList());
  }

  @Test
  void shouldSetEventPostponedWhenUpdateLeagueWhenSeasonIsDifferent() {
    //given
    LeagueSoccer leagueSoccer = new LeagueSoccer();
    leagueSoccer.setId(1L);
    leagueSoccer.setCurrentSeason("2020");
    leagueSoccer.setExternalId(4338L);
    RoundSoccerApiDto roundDto = new RoundSoccerApiDto();
    EventSoccerApiDto eventDto = new EventSoccerApiDto();
    eventDto.setIsPostponed("yes");
    roundDto.setEvents(Collections.singletonList(eventDto));
    EventSoccer eventSoccer = new EventSoccer();
    eventSoccer.setDate(LocalDate.now());
    eventSoccer.setTime(LocalTime.now());
    TeamScoreSoccerApiDto teamScoreSoccerApiDto = new TeamScoreSoccerApiDto();
    TeamScoreSoccerListApiDto teamScoreSoccerListApiDto = new TeamScoreSoccerListApiDto();
    teamScoreSoccerListApiDto.setTeams(Collections.singletonList(teamScoreSoccerApiDto));

    //when
    when(leagueSoccerService.findAll()).thenReturn(Collections.singletonList(leagueSoccer));
    when(soccerApiCommunication.fetchLeagueCurrentSeason(any())).thenReturn("2021");
    when(leagueSoccerService.save(leagueSoccer)).thenReturn(leagueSoccer);
    when(soccerApiCommunication
        .fetchRound(anyInt(), any()))
        .thenReturn(roundDto);
    when(soccerApiCommunication.fetchRound(2, leagueSoccer.getExternalId()))
        .thenReturn(new RoundSoccerApiDto());
    when(soccerApiCommunication.fetchLeagueTeams(leagueSoccer))
        .thenReturn(teamScoreSoccerListApiDto);
    when(EventSoccerMapper.mapDtoToEntity(eventDto)).thenReturn(eventSoccer);
    when(modelMapper.map(teamScoreSoccerApiDto, TeamScoreSoccer.class))
        .thenReturn(new TeamScoreSoccer());
    soccerUpdateService.updateLeagues();

    //then
    verify(eventSoccerService, times(1)).deleteAllByLeagueId(1L);
    verify(eventSoccerService, times(1)).saveAll(anyList());
    verify(leagueSoccerService, times(1)).save(any());
    verify(leagueSoccerService, times(1)).save(any());
    verify(teamScoreSoccerService, times(1)).deleteAllByLeagueId(1L);
    verify(teamScoreSoccerService, times(1)).saveAll(anyList());
  }

  @Test
  void shouldUpdateTeams() {
    //given
    LeagueSoccer leagueSoccer = new LeagueSoccer();
    leagueSoccer.setTeamsScores(new ArrayList<>());
    List<LeagueSoccer> leagueSoccerList = Collections.singletonList(leagueSoccer);
    TeamScoreSoccerApiDto teamScoreSoccerApiDto = new TeamScoreSoccerApiDto();
    TeamScoreSoccerListApiDto teamScoreSoccerListApiDto = new TeamScoreSoccerListApiDto();
    teamScoreSoccerListApiDto.setTeams(Collections.singletonList(teamScoreSoccerApiDto));

    //when
    when(leagueSoccerService.findAll()).thenReturn(leagueSoccerList);
    when(soccerApiCommunication.fetchLeagueTeams(leagueSoccer))
        .thenReturn(teamScoreSoccerListApiDto);
    when(modelMapper.map(teamScoreSoccerApiDto, TeamScoreSoccer.class)).thenReturn(new TeamScoreSoccer());
    soccerUpdateService.updateTeams();

    //then
    verify(teamScoreSoccerService, times(1)).saveAll(anyList());
  }

  @Test
  void shouldUpdateTeamIfPresent() {
    //given
    TeamScoreSoccer teamScoreSoccer = new TeamScoreSoccer();
    teamScoreSoccer.setTeamId("42123141");
    LeagueSoccer leagueSoccer = new LeagueSoccer();
    leagueSoccer.setTeamsScores(Collections.singletonList(teamScoreSoccer));
    List<LeagueSoccer> leagueSoccerList = Collections.singletonList(leagueSoccer);
    TeamScoreSoccerApiDto teamScoreSoccerApiDto = new TeamScoreSoccerApiDto();
    TeamScoreSoccerListApiDto teamScoreSoccerListApiDto = new TeamScoreSoccerListApiDto();
    teamScoreSoccerListApiDto.setTeams(Collections.singletonList(teamScoreSoccerApiDto));

    //when
    when(leagueSoccerService.findAll()).thenReturn(leagueSoccerList);
    when(soccerApiCommunication.fetchLeagueTeams(leagueSoccer))
        .thenReturn(teamScoreSoccerListApiDto);
    when(modelMapper.map(teamScoreSoccerApiDto, TeamScoreSoccer.class)).thenReturn(teamScoreSoccer);
    soccerUpdateService.updateTeams();

    //then
    verify(teamScoreSoccerService, times(1)).saveAll(anyList());
  }

  @Test
  void shouldUpdateTodayEvents() {
    //given
    EventSoccer eventSoccer = new EventSoccer();
    eventSoccer.setTime(LocalTime.now());
    eventSoccer.setDate(LocalDate.now());
    List<EventSoccer> eventSoccerList = Collections.singletonList(eventSoccer);
    EventSoccerApiDto eventSoccerApiDto = mock(EventSoccerApiDto.class);
    EventSoccerListDto eventSoccerListDto = new EventSoccerListDto();
    eventSoccerListDto.setEvents(Collections.singletonList(eventSoccerApiDto));

    //when
    when(eventSoccerService.findAllByDate(LocalDate.now())).thenReturn(eventSoccerList);
    when(soccerApiCommunication.fetchEvent(eventSoccer.getExternalId()))
        .thenReturn(eventSoccerListDto);
    when(EventSoccerMapper.mapDtoToEntity(eventSoccerApiDto))
        .thenReturn(eventSoccer);
    soccerUpdateService.updateTodayEvents();

    //then
    verify(eventSoccerService, times(1)).save(eventSoccer);
    verify(eventSoccerService, times(1)).saveAll(eventSoccerList);
  }

  @Test
  void shouldUpdateYesterdayEvents() {
    //given
    EventSoccer eventSoccer = new EventSoccer();
    eventSoccer.setTime(LocalTime.now());
    eventSoccer.setDate(LocalDate.now().minusDays(1));
    List<EventSoccer> eventSoccerList = Collections.singletonList(eventSoccer);
    EventSoccerApiDto eventSoccerApiDto = new EventSoccerApiDto();
    EventSoccerListDto eventSoccerListDto = new EventSoccerListDto();
    eventSoccerListDto.setEvents(Collections.singletonList(eventSoccerApiDto));

    //when
    when(eventSoccerService.findAllByDate(LocalDate.now().minusDays(1))).thenReturn(eventSoccerList);
    when(soccerApiCommunication.fetchEvent(eventSoccer.getExternalId()))
        .thenReturn(eventSoccerListDto);
    when(EventSoccerMapper.mapDtoToEntity(eventSoccerApiDto)).thenReturn(eventSoccer);
    soccerUpdateService.updateYesterdayEvents();

    //then
    verify(eventSoccerService, times(1)).save(eventSoccer);
    verify(eventSoccerService, times(1)).saveAll(eventSoccerList);
  }

  @Test
  void shouldUpdateAllPastEvents() {
    //given
    EventSoccer eventSoccer = new EventSoccer();
    eventSoccer.setTime(LocalTime.now());
    eventSoccer.setDate(LocalDate.now().minusDays(1));
    List<EventSoccer> eventSoccerList = Collections.singletonList(eventSoccer);
    EventSoccerApiDto eventSoccerApiDto = new EventSoccerApiDto();
    EventSoccerListDto eventSoccerListDto = new EventSoccerListDto();
    eventSoccerListDto.setEvents(Collections.singletonList(eventSoccerApiDto));

    //when
    when(eventSoccerService.findAllUnsetBeforeDate(LocalDate.now()))
        .thenReturn(eventSoccerList);
    when(soccerApiCommunication.fetchEvent(eventSoccer.getExternalId()))
        .thenReturn(eventSoccerListDto);
    when(EventSoccerMapper.mapDtoToEntity(eventSoccerApiDto)).thenReturn(eventSoccer);
    soccerUpdateService.updateAllPastEvents();

    //then
    verify(eventSoccerService, times(1)).saveAll(eventSoccerList);
    verify(eventSoccerService, times(1)).save(eventSoccer);
  }
}