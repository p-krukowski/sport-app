package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerBasicsGetDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.get.TeamScoreSoccerGetDto;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamScoreSoccerRepo extends JpaRepository<TeamScoreSoccer, String> {

  List<TeamScoreSoccer> findAllByLeagueId(Long leagueId);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".TeamScoreSoccerBasicsGetDto(t.name, t.played, t.goalsFor, t.total) from TeamScoreSoccer t" +
      " where t.league.id = ?1")
  List<TeamScoreSoccerBasicsGetDto> findAllBasicsByLeagueId(Long leagueId);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".TeamScoreSoccerGetDto(t.name, t.win, t.draw, t.loss, t.played, " +
      "t.goalsFor, t.goalsAgainst, t.goalsDifference, t.total) from TeamScoreSoccer t" +
      " where t.league.id = ?1")
  List<TeamScoreSoccerGetDto> findAllDtosByLeagueId(Long leagueId);

  void deleteAllByLeagueId(Long leagueId);
}