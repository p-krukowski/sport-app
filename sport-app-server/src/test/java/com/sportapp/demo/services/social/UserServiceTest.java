package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.repo.UserRepo;
import com.sportapp.demo.repo.VerificationTokenRepo;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

class UserServiceTest {

  @Mock
  UserRepo userRepo;
  @Mock
  PasswordEncoder passwordEncoder;
  @Mock
  VerificationTokenRepo tokenRepo;
  @InjectMocks
  UserService userService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldThrowEntityNotFoundExceptionWhenUserNotFound() {
    //given
    Long id = 1L;

    //when
    when(userRepo.findById(id)).thenReturn(Optional.empty());

    //then
    assertThrows(EntityNotFoundException.class, () -> userService.findUserById(id));
  }

  @Test
  void shouldSaveNewUser() {
    //given
    SignUpRequest signUpRequest = new SignUpRequest();
    signUpRequest.setEmail("a@a.com");
    signUpRequest.setPassword("123123qwe");
    signUpRequest.setPasswordConfirm("123123qwe");
    signUpRequest.setUsername("abc");

    //when
    when(passwordEncoder.encode(signUpRequest.getPassword())).thenReturn("asdawd1d12dad12");
    userService.saveNewUser(signUpRequest);

    //
    verify(userRepo, times(1)).save(any());

  }

}