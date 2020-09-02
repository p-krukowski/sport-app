package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.UserPropsService;
import com.sportapp.demo.services.social.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/props")
public class UserPropsController {

    UserService userService;
    UserPropsService userPropsService;

    public UserPropsController(UserService userService, UserPropsService userPropsService) {
        this.userService = userService;
        this.userPropsService = userPropsService;
    }

    @GetMapping("/leagues-ids")
    @ResponseBody
    public List<Long> fetchUserLeaguesIds(@CurrentUser UserPrincipal currentUser) {
        return userPropsService.findLeaguesIdsByUserId(currentUser.getId());
    }

    @GetMapping("/leagues")
    @ResponseBody
    public List<LeagueSoccerGetDto> fetchUserLeagues(@CurrentUser UserPrincipal currentUser) {
        return userPropsService.findLeaguesDtosByUserId(currentUser.getId());
    }

}
