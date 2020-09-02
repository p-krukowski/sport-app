package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepo userRepo;

  @Autowired
  public UserService(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  public User findUserById(Long id) {
    return userRepo.findById(id).orElseThrow(() -> new NullPointerException("User not found"));
  }

  public User findUserWithPropsById(Long id) {
    return userRepo.findUserWithPropsById(id);
  }

  public void addUser(User user) {
    UserProps userProps = new UserProps();
    userProps.setUser(user);
    user.setUserProps(userProps);
    userRepo.save(user);
  }

  public Boolean existsByUsername(String username) {
    return userRepo.existsByUsername(username);
  }

  public Boolean existsByMail(String mail) {
    return userRepo.existsByMail(mail);
  }
}
