package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.repo.UserPropsRepo;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

class UserPropsServiceTest {

  @Mock
  UserPropsRepo userPropsRepo;
  @Mock
  ModelMapper modelMapper;
  @InjectMocks
  UserPropsService userPropsService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldFindLeaguesIdsByUserId() {
    //given
    Long userId = 1L;
    LeagueSoccer leagueSoccer1 = new LeagueSoccer();
    LeagueSoccer leagueSoccer2 = new LeagueSoccer();
    leagueSoccer1.setId(1L);
    leagueSoccer2.setId(2L);
    List<LeagueSoccer> leagueSoccerList = new ArrayList<>();
    leagueSoccerList.add(leagueSoccer1);
    leagueSoccerList.add(leagueSoccer2);
    List<Long> ids = new ArrayList<>();
    ids.add(1L);
    ids.add(2L);

    //when
    when(userPropsRepo.findLeaguesByUserId(userId)).thenReturn(leagueSoccerList);

    //then
    assertEquals(ids, userPropsService.findLeaguesIdsByUserId(userId));
  }
}