package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoundSoccerRepo extends JpaRepository<RoundSoccer, Long> {

    Optional<RoundSoccer> findById(Long roundNumber);

    RoundSoccer findByRoundNumberAndSeason(int roundNumber, SeasonSoccer season);

    @Query("select count(r) from RoundSoccer r" +
            " where r.season.league.id = ?1")
    int findRoundsAmountByLeagueId(Long leagueId);
}
