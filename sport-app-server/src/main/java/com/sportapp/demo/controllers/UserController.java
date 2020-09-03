package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.social.UserGetDto;
import com.sportapp.demo.models.payload.UserSummary;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.UserPropsService;
import com.sportapp.demo.services.social.UserService;
import java.lang.reflect.Type;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;
  private final UserPropsService userPropsService;
  private final ModelMapper modelMapper;

  @Autowired
  public UserController(UserService userService, ModelMapper modelMapper,
      UserPropsService userPropsService) {
    this.userService = userService;
    this.modelMapper = modelMapper;
    this.userPropsService = userPropsService;
  }

  @GetMapping("/me")
  @PreAuthorize("isAuthenticated()")
  public UserSummary fetchCurrentUser(@CurrentUser User currentUser) {
    return new UserSummary(currentUser.getId(), currentUser.getUsername());
  }

  @GetMapping("/me/info")
  @PreAuthorize("isAuthenticated()")
  public UserGetDto fetchAccountInfo(@CurrentUser User currentUser) {
    currentUser.setUserProps(userPropsService.findByUserId(currentUser.getId()));
    return convertToDto(currentUser);
  }

  private UserGetDto convertToDto(User user) {
    Type typeMap = new TypeToken<UserGetDto>() {}.getType();
    return modelMapper.map(user, typeMap);
  }
}
