package com.sportapp.demo.services.social;

import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.models.social.VerificationToken;
import com.sportapp.demo.repo.UserRepo;
import com.sportapp.demo.repo.VerificationTokenRepo;
import javax.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepo userRepo;
  PasswordEncoder passwordEncoder;
  private VerificationTokenRepo tokenRepository;

  public UserService(UserRepo userRepo,
      PasswordEncoder passwordEncoder, VerificationTokenRepo tokenRepository) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.tokenRepository = tokenRepository;
  }

  public User findUserById(Long id) {
    return userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
  }

  public User findUserWithPropsById(Long id) {
    return userRepo.findUserWithPropsById(id);
  }

  public User saveNewUser(SignUpRequest signUpRequest) {
    User user = new User();
    user.setUsername(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    UserProps userProps = new UserProps();
    userProps.setUser(user);
    user.setUserProps(userProps);
    return userRepo.save(user);
  }

  public boolean existsByUsername(String username) {
    return userRepo.existsByUsername(username);
  }

  public boolean existsByEmail(String email) {
    return userRepo.existsByEmail(email);
  }

  public VerificationToken getVerificationToken(String VerificationToken) {
    return tokenRepository.findByToken(VerificationToken);
  }

  public void createVerificationToken(User user, String token) {
    VerificationToken myToken = new VerificationToken();
    myToken.setToken(token);
    myToken.setUser(user);
    tokenRepository.save(myToken);
  }

  public User save(User user) {
    return userRepo.save(user);
  }
}
