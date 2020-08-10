package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerBasicsGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.SeasonSoccerService;
import com.sportapp.demo.services.sportdata.TeamScoreSoccerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("sport/teams")
public class TeamScoreSoccerController {

    LeagueSoccerService leagueSoccerService;
    SeasonSoccerService seasonSoccerService;
    TeamScoreSoccerService teamScoreSoccerService;

    ModelMapper modelMapper;

    @Autowired
    public TeamScoreSoccerController(LeagueSoccerService leagueSoccerService,
                                     SeasonSoccerService seasonSoccerService,
                                     TeamScoreSoccerService teamScoreSoccerService,
                                     ModelMapper modelMapper) {
        this.leagueSoccerService = leagueSoccerService;
        this.seasonSoccerService = seasonSoccerService;
        this.teamScoreSoccerService = teamScoreSoccerService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/l={leagueId}")
    public List<TeamScoreSoccerBasicsGetDto> fetchAllTeams(@PathVariable Long leagueId) {
        return teamScoreSoccerService.findAllBasicsByLeagueId(leagueId);
    }

    private List<TeamScoreSoccerGetDto> convertToListDto(List<TeamScoreSoccer> teams) {
        Type typeMap = new TypeToken<List<TeamScoreSoccerGetDto>>() {}.getType();
        return modelMapper.map(teams, typeMap);
    }
}
