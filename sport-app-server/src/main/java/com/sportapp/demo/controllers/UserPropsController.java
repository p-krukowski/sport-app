package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.models.sportdata.League;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/props")
public class UserPropsController {

    UserService userService;
    ModelMapper modelMapper;

    public UserPropsController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/leagues-ids")
    @ResponseBody
    public List<Long> fetchUserLeaguesIds(@CurrentUser UserPrincipal currentUser) {
        UserProps userProps = userService.findUserById(currentUser.getId()).getUserProps();
        return userProps.getLeagues()
                .stream()
                .map(League::getId)
                .collect(Collectors.toList());
    }

    @GetMapping("/leagues")
    @ResponseBody
    public List<LeagueSoccerGetDto> fetchUserLeagues(@CurrentUser UserPrincipal currentUser) {
        User user = userService.findUserById(currentUser.getId());
        UserProps userProps = user.getUserProps();
        List<LeagueSoccer> leagues = userProps.getLeagues();

        return convertToDto(leagues);
    }

    private List<LeagueSoccerGetDto> convertToDto(List<LeagueSoccer> leagues) {
        Type typeMap = new TypeToken<List<LeagueSoccerGetDto>>() {}.getType();
        return modelMapper.map(leagues, typeMap);
    }


}
