package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepo extends JpaRepository<VerificationToken, Long> {

  VerificationToken findByToken(String token);
}
