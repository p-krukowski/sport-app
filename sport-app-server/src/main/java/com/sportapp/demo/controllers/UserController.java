package com.sportapp.demo.controllers;

import com.sportapp.demo.models.dtos.social.UserGetDto;
import com.sportapp.demo.models.payload.UserSummary;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.UserPropsService;
import java.lang.reflect.Type;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
class UserController {

  private final UserPropsService userPropsService;
  private final ModelMapper modelMapper;

  @GetMapping("/me")
  @PreAuthorize("isAuthenticated()")
  UserSummary fetchCurrentUser(@CurrentUser User currentUser) {
    return new UserSummary(currentUser.getId(), currentUser.getUsername());
  }

  @GetMapping("/me/info")
  @PreAuthorize("isAuthenticated()")
  UserGetDto fetchAccountInfo(@CurrentUser User currentUser) {
    currentUser.setUserProps(userPropsService.findByUserId(currentUser.getId()));
    return convertToDto(currentUser);
  }

  private UserGetDto convertToDto(User user) {
    Type typeMap = new TypeToken<UserGetDto>() {
    }.getType();
    return modelMapper.map(user, typeMap);
  }
}
