package com.sportapp.demo.services;

import com.sportapp.demo.models.User;
import com.sportapp.demo.models.UserProps;
import com.sportapp.demo.repo.UserPropsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserPropsService {

    private UserPropsRepo userPropsRepo;
    private UserService userService;

    @Autowired
    public UserPropsService(UserPropsRepo userPropsRepo, @Lazy UserService userService) {
        this.userPropsRepo = userPropsRepo;
        this.userService = userService;
    }

    public void addUserProps(User user) {
        UserProps userProps = new UserProps(user);
        userPropsRepo.save(userProps);
    }

    public UserProps getUserPropsByUsername(Long id) {
        return userPropsRepo.findUserPropsByUser(userService.getUserById(id)).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }
}
