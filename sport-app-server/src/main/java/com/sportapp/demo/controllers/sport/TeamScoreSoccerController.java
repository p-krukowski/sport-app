package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerBasicsGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/teams")
public class TeamScoreSoccerController {

    TeamScoreSoccerService teamScoreSoccerService;

    @Autowired
    public TeamScoreSoccerController(TeamScoreSoccerService teamScoreSoccerService) {
        this.teamScoreSoccerService = teamScoreSoccerService;
    }

    @GetMapping("/table/basic&l={leagueId}")
    public List<TeamScoreSoccerBasicsGetDto> fetchAllTeamsBasicsByLeagueId(@PathVariable Long leagueId) {
        return teamScoreSoccerService.findAllDtosBasicsByLeagueId(leagueId);
    }

    @GetMapping("/table/l={leagueId}")
    public List<TeamScoreSoccerGetDto> fetchAllTeamsByLeagueId(@PathVariable Long leagueId) {
        return teamScoreSoccerService.findAllDtosByLeagueId(leagueId);
    }
}
