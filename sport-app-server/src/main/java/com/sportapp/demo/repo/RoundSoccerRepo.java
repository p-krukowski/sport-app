package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoundSoccerRepo extends JpaRepository<RoundSoccer, Long> {

    Optional<RoundSoccer> findById(Long roundNumber);

    RoundSoccer findByRoundNumberAndSeason(int roundNumber, SeasonSoccer season);
}
