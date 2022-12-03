package com.sportapp.demo.services.social;


import com.sportapp.demo.repo.UserRepo;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepo userRepo;

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userRepo.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found by username"));
  }

  @Transactional
  public UserDetails loadByUserId(Long id) {
    return userRepo.findById(id).orElseThrow(
        () -> new EntityNotFoundException("User not found by id"));
  }
}
