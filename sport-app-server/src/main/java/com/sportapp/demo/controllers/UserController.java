package com.sportapp.demo.controllers;

import com.sportapp.demo.models.User;
import com.sportapp.demo.payload.UserSummary;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.UserPropsService;
import com.sportapp.demo.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserService userService;
    private UserPropsService userPropsService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, UserPropsService userPropsService) {
        this.userService = userService;
        this.userPropsService = userPropsService;
    }

    @PostMapping("/add-user")
    public int addUser(@RequestBody User user) {
        userService.addUser(user);
        return 1;
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername());
        return userSummary;
    }

    @GetMapping("/myaccount")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    public User getAccountInfo(@CurrentUser UserPrincipal userPrincipal) {
        User user = userService.getUserById(userPrincipal.getId());
        return user;
    }
}
