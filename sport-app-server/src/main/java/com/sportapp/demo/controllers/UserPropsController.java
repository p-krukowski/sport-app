package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.UserPropsService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/props")
@RequiredArgsConstructor
class UserPropsController {

  private final UserPropsService userPropsService;

  @GetMapping("/leagues-ids")
  @ResponseBody
  List<Long> fetchUserLeaguesIds(@CurrentUser User currentUser) {
    return userPropsService.findLeaguesIdsByUserId(currentUser.getId());
  }

  @GetMapping("/leagues")
  @ResponseBody
  List<LeagueSoccerGetDto> fetchUserLeagues(@CurrentUser User currentUser) {
    return userPropsService.findLeaguesDtosByUserId(currentUser.getId());
  }

}
