package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.RoundSoccer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoundSoccerRepo extends JpaRepository<RoundSoccer, Long> {

  Optional<RoundSoccer> findById(Long roundNumber);

  @Query("select count(r) from RoundSoccer r" +
      " where r.league.id = ?1")
  int findRoundsAmountByLeagueId(Long leagueId);

  void deleteAllByLeagueId(Long leagueId);

  List<RoundSoccer> findAllByLeagueId(Long leagueId);
}
