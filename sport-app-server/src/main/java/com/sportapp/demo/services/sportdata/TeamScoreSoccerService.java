package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerBasicsGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.repo.TeamScoreSoccerRepo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamScoreSoccerService {

  private final TeamScoreSoccerRepo teamScoreSoccerRepo;

  public List<TeamScoreSoccer> findAll() {
    return teamScoreSoccerRepo.findAll();
  }

  public List<TeamScoreSoccer> findAllByLeagueId(Long leagueId) {
    return teamScoreSoccerRepo.findAllByLeagueId(leagueId);
  }

  public List<TeamScoreSoccerBasicsGetDto> findAllDtosBasicsByLeagueId(Long leagueId) {
    return teamScoreSoccerRepo.findAllBasicsByLeagueId(leagueId);
  }

  public void saveAll(List<TeamScoreSoccer> teams) {
    teamScoreSoccerRepo.saveAll(teams);
  }

  public List<TeamScoreSoccerGetDto> findAllDtosByLeagueId(Long leagueId) {
    return teamScoreSoccerRepo.findAllDtosByLeagueId(leagueId);
  }

  public void deleteAllByLeagueId(Long leagueId) {
    teamScoreSoccerRepo.deleteAllByLeagueId(leagueId);
  }
}
