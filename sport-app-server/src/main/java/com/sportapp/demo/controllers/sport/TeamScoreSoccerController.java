package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerBasicsGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/teams")
@RequiredArgsConstructor
class TeamScoreSoccerController {

  private final TeamScoreSoccerService teamScoreSoccerService;

  @GetMapping("/table/basic&l={leagueId}")
  List<TeamScoreSoccerBasicsGetDto> fetchAllTeamsBasicsByLeagueId(@PathVariable Long leagueId) {
    return teamScoreSoccerService.findAllDtosBasicsByLeagueId(leagueId);
  }

  @GetMapping("/table/l={leagueId}")
  List<TeamScoreSoccerGetDto> fetchAllTeamsByLeagueId(@PathVariable Long leagueId) {
    return teamScoreSoccerService.findAllDtosByLeagueId(leagueId);
  }
}
