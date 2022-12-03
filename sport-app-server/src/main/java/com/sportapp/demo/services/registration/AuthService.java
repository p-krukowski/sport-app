package com.sportapp.demo.services.registration;

import com.sportapp.demo.exceptions.SignUpException;
import com.sportapp.demo.models.payload.JwtAuthenticationResponse;
import com.sportapp.demo.models.payload.LoginRequest;
import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.models.registration.OnRegistrationCompleteEvent;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.JwtTokenProvider;
import com.sportapp.demo.services.social.UserService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final JwtTokenProvider tokenProvider;
  private final ApplicationEventPublisher eventPublisher;

  public JwtAuthenticationResponse provideAuthenticationToken(LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(),
            loginRequest.getPassword()
        )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);

    return new JwtAuthenticationResponse(jwt);
  }

  public ResponseEntity<?> registerUser(SignUpRequest signUpRequest, HttpServletRequest request) {
    try {
      validateSignUpRequest(signUpRequest);
      User user = userService.saveNewUser(signUpRequest);
      String appUrl = "http://" + request.getServerName() + ":" + request.getServerPort();
      eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user, appUrl));
      return new ResponseEntity<>("User signed up successfully", HttpStatus.OK);
    } catch (SignUpException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (RuntimeException e) {
      return new ResponseEntity<>("Mail sending issue occurred", HttpStatus.BAD_REQUEST);
    }
  }

  private void validateSignUpRequest(SignUpRequest signUpRequest) throws SignUpException {
    if (usernameExists(signUpRequest)) {
      throw new SignUpException("Username already exists");
    }
    if (emailExists(signUpRequest)) {
      throw new SignUpException("Email already in use");
    }
  }

  private boolean emailExists(SignUpRequest signUpRequest) {
    return userService.existsByEmail(signUpRequest.getEmail());
  }

  private boolean usernameExists(SignUpRequest signUpRequest) {
    return userService.existsByUsername(signUpRequest.getUsername());
  }
}
