package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.UserPropsService;
import com.sportapp.demo.services.social.UserService;
import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/soccer/leagues")
public class LeagueSoccerController {

  LeagueSoccerService leagueSoccerService;
  UserService userService;
  UserPropsService userPropsService;

  @Autowired
  public LeagueSoccerController(LeagueSoccerService leagueSoccerService,
      UserService userService, UserPropsService userPropsService) {
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

  @GetMapping("/{leagueId}/roundsAmount")
  public int fetchLeagueRoundsAmount(@PathVariable Long leagueId) {
    return leagueSoccerService.findRoundsAmountById(leagueId);
  }

  @PostMapping("/panel/")
  @ResponseStatus
  public ResponseEntity<HttpStatus> updateUserPanelLeagues(@RequestBody List<Long> leaguesIds,
      @CurrentUser User currentUser) {
    List<LeagueSoccer> leagues = leagueSoccerService.findAllById(leaguesIds);
    userPropsService.updateLeagues(leagues, currentUser.getId());

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
