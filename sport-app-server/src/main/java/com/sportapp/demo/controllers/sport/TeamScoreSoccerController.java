package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import com.sportapp.demo.services.sportdata.SeasonSoccerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("sport/teams")
public class TeamScoreSoccerController {

    LeagueSoccerService leagueSoccerService;
    SeasonSoccerService seasonSoccerService;

    ModelMapper modelMapper;

    @Autowired
    public TeamScoreSoccerController(LeagueSoccerService leagueSoccerService, SeasonSoccerService seasonSoccerService,
                                     ModelMapper modelMapper) {
        this.leagueSoccerService = leagueSoccerService;
        this.seasonSoccerService = seasonSoccerService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/l={leagueId}")
    public List<TeamScoreSoccerGetDto> fetchAllTeams(@PathVariable Long leagueId) {
        SeasonSoccer season = seasonSoccerService.findByLeagueAndSeasonOrNew(leagueId);

        return convertToListDto(season.getTeams());
    }

    private List<TeamScoreSoccerGetDto> convertToListDto(List<TeamScoreSoccer> teams) {
        Type typeMap = new TypeToken<List<TeamScoreSoccerGetDto>>() {}.getType();
        return modelMapper.map(teams, typeMap);
    }
}
