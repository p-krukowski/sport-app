package com.sportapp.demo.services.sportdata;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.sportapp.demo.repo.LeagueSoccerRepo;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LeagueSoccerServiceTest {

  @Mock
  LeagueSoccerRepo leagueSoccerRepo;
  @InjectMocks
  LeagueSoccerService leagueSoccerService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldFindAllDisciplines() {
    //given
    List<String> disciplines = new ArrayList<>();
    disciplines.add("soccer");

    //when
    when(leagueSoccerRepo.findAllDisciplines())
        .thenReturn(Collections.singletonList("Soccer"));

    //then
    assertEquals(disciplines, leagueSoccerService.findAllDisciplines());
  }
}