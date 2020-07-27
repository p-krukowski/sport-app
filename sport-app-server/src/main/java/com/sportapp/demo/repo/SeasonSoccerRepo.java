package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SeasonSoccerRepo extends JpaRepository<SeasonSoccer, String> {

    Optional<SeasonSoccer> findByLeagueAndSeason(LeagueSoccer league, String season);
}
