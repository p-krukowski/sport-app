package com.sportapp.demo.services.social;

import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepo userRepo;
  PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }

  public User findUserById(Long id) {
    return userRepo.findById(id).orElseThrow(() -> new NullPointerException("User not found"));
  }

  public User findUserWithPropsById(Long id) {
    return userRepo.findUserWithPropsById(id);
  }

  public void saveNewUser(SignUpRequest signUpRequest) {
    User user = new User();
    user.setUsername(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    UserProps userProps = new UserProps();
    userProps.setUser(user);
    user.setUserProps(userProps);
    userRepo.save(user);
  }

  public boolean existsByUsername(String username) {
    return userRepo.existsByUsername(username);
  }

  public boolean existsByEmail(String email) {
    return userRepo.existsByEmail(email);
  }
}
