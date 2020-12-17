package com.sportapp.demo.controllers;

import com.sportapp.demo.models.payload.LoginRequest;
import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.services.registration.AuthService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok().body(authService.provideAuthenticationToken(loginRequest));
  }

  @Transactional
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest,
      HttpServletRequest request) {
    return authService.registerUser(signUpRequest, request);
  }
}
