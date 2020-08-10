package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.sportdata.League;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.UserPropsService;
import com.sportapp.demo.services.social.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/props")
public class UserPropsController {

    UserService userService;
    UserPropsService userPropsService;
    ModelMapper modelMapper;

    public UserPropsController(UserService userService, UserPropsService userPropsService, ModelMapper modelMapper) {
        this.userService = userService;
        this.userPropsService = userPropsService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/leagues-ids")
    @ResponseBody
    public List<Long> fetchUserLeaguesIds(@CurrentUser UserPrincipal currentUser) {
        return userPropsService.findLeaguesByUserId(currentUser.getId())
                .stream()
                .map(League::getId)
                .collect(Collectors.toList());
    }

    @GetMapping("/leagues")
    @ResponseBody
    public List<LeagueSoccerGetDto> fetchUserLeagues(@CurrentUser UserPrincipal currentUser) {
        return convertToDto(userPropsService.findLeaguesByUserId(currentUser.getId()));
    }

    private List<LeagueSoccerGetDto> convertToDto(List<LeagueSoccer> leagues) {
        Type typeMap = new TypeToken<List<LeagueSoccerGetDto>>() {}.getType();
        return modelMapper.map(leagues, typeMap);
    }


}
