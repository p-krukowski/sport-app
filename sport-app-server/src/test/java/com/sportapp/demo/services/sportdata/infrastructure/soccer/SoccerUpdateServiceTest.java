package com.sportapp.demo.services.sportdata.infrastructure.soccer;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.services.sportdata.EventSoccerService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import java.util.Collections;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class SoccerUpdateServiceTest {

  @Mock
  SoccerApiCommunication soccerApiCommunication;
  @Mock
  LeagueSoccerService leagueSoccerService;
  @Mock
  EventSoccerService eventSoccerService;
  @Mock
  TeamScoreSoccerService teamScoreSoccerService;
  @InjectMocks
  SoccerUpdateService soccerUpdateService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
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

}