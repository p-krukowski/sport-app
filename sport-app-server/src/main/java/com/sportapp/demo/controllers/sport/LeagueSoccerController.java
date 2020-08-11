package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.UserPropsService;
import com.sportapp.demo.services.social.UserService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sport/soccer/leagues")
public class LeagueSoccerController {

    ModelMapper modelMapper;
    LeagueSoccerService leagueSoccerService;
    UserService userService;
    UserPropsService userPropsService;

    @Autowired
    public LeagueSoccerController(ModelMapper modelMapper, LeagueSoccerService leagueSoccerService,
                                  UserService userService, UserPropsService userPropsService) {
        this.modelMapper = modelMapper;
        this.leagueSoccerService = leagueSoccerService;
        this.userService = userService;
        this.userPropsService = userPropsService;
    }

    @GetMapping
    public List<LeagueSoccerGetDto> fetchLeagues() {
        return leagueSoccerService.findAllGetDtos();
    }

    @GetMapping("/{leagueId}")
    public LeagueSoccerGetDto fetchLeague(@PathVariable Long leagueId) {
        return leagueSoccerService.findGetDtoById(leagueId);
    }

    @PostMapping("/panel/")
    @ResponseStatus
    public ResponseEntity<HttpStatus> updateUserPanelLeagues(@RequestBody List<Long> leaguesIds,
                                                             @CurrentUser UserPrincipal currentUser) {
        List<LeagueSoccer> leagues = leagueSoccerService.findAllById(leaguesIds);
        userPropsService.updateLeagues(leagues, currentUser.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
