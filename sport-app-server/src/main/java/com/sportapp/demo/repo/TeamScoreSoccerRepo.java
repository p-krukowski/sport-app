package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamScoreSoccerRepo extends JpaRepository<TeamScoreSoccer, String> {

    TeamScoreSoccer findByTeamIdAndSeason(String teamId, SeasonSoccer season);

    List<TeamScoreSoccer> findAllByLeagueId(Long leagueId);
}
