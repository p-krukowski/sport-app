package com.sportapp.demo.controllers;

import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.VerificationToken;
import com.sportapp.demo.services.social.UserService;
import java.util.Calendar;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
class RegistrationController {

  private final UserService userService;

  @GetMapping("/registrationConfirm")
  ResponseEntity<?> confirmRegistration(@RequestParam("token") String token) {

    VerificationToken verificationToken = userService.getVerificationToken(token);
    if (verificationToken == null) {
      return new ResponseEntity<>("Incorrect token", HttpStatus.BAD_REQUEST);
    }

    User user = verificationToken.getUser();
    Calendar cal = Calendar.getInstance();
    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
      return new ResponseEntity<>("Verification link inactive", HttpStatus.BAD_REQUEST);
    }

    user.setEnabled(true);
    userService.save(user);
    return new ResponseEntity<>("Account activated", HttpStatus.OK);
  }
}
