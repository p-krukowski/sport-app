package com.sportapp.demo.security;


import com.sportapp.demo.repo.UserRepo;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepo userRepo;

  @Autowired
  public UserDetailsServiceImpl(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userRepo.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found by username"));
  }

  @Transactional
  public UserDetails loadByUserId(Long id) {
    return userRepo.findById(id).orElseThrow(
        () -> new UsernameNotFoundException("User not found by id")
    );
  }
}
