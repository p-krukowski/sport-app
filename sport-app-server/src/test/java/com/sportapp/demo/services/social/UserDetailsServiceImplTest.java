package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.sportapp.demo.repo.UserRepo;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

class UserDetailsServiceImplTest {

  @Mock
  UserRepo userRepo;
  @InjectMocks
  UserDetailsServiceImpl userDetailsService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldThrowUsernameNotFoundExceptionWhenNotFoundByUsername() {
    //given
    String username = "abc";

    //when
    when(userRepo.findByUsername(username)).thenReturn(Optional.empty());

    //then
    assertThrows(UsernameNotFoundException.class, () ->
        userDetailsService.loadUserByUsername(username));
  }
  @Test
  void shouldThrowEntityNotFoundExceptionWhenNotFoundById() {
    //given
    Long id = 1L;

    //when
    when(userRepo.findById(id)).thenReturn(Optional.empty());

    //then
    assertThrows(EntityNotFoundException.class, () ->
        userDetailsService.loadByUserId(id));
  }
}