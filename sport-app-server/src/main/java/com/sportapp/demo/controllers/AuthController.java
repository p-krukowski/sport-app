package com.sportapp.demo.controllers;


import com.sportapp.demo.models.User;
import com.sportapp.demo.payload.ApiResponse;
import com.sportapp.demo.payload.JwtAuthenticationResponse;
import com.sportapp.demo.payload.LoginRequest;
import com.sportapp.demo.payload.SignUpRequest;
import com.sportapp.demo.security.JwtTokenProvider;
import com.sportapp.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    UserService userService;
    PasswordEncoder passwordEncoder;
    JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userService.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Ta nazwa użytkownika jest już zajęta"), HttpStatus.BAD_REQUEST);
        }
        if(userService.existsByMail(signUpRequest.getMail())) {
            return new ResponseEntity(new ApiResponse(false, "Na ten e-mail zostało już założone konto"), HttpStatus.BAD_REQUEST);
        }
        if(!signUpRequest.getPassword().equals(signUpRequest.getPasswordConfirm())) {
            return new ResponseEntity(new ApiResponse(false, "Hasła nie są identyczne"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword(), signUpRequest.getMail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userService.addUser(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(signUpRequest.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
