package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSoccerRepo extends JpaRepository<EventSoccer, Long> {

  List<EventSoccer> findAllByDate(LocalDate date);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".EventSoccerGetDto(e.homeTeamName, e.awayTeamName, e.homeScore, e.awayScore, e.date, e.time)"
      +
      " from EventSoccer e" +
      " where e.league.id = ?1 and e.dateTime < ?2 and e.postponed <> true")
  List<EventSoccerGetDto> findRecentByLeagueId(Long leagueId, LocalDateTime now, Pageable pageable);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".EventSoccerGetDto(e.homeTeamName, e.awayTeamName, e.homeScore, e.awayScore, e.date, e.time)" +
      " from EventSoccer e" +
      " where e.league.id = ?1 and e.dateTime >= ?2 and e.postponed <> true")
  List<EventSoccerGetDto> findNextByLeagueId(Long leagueId, LocalDateTime now, Pageable pageable);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".EventSoccerGetDto(e.homeTeamName, e.awayTeamName, e.homeScore, e.awayScore, e.date, e.time)" +
      " from EventSoccer e" +
      " where e.league.id = ?1 and e.round.roundNumber = ?2")
  List<EventSoccerGetDto> findEventsDtosByLeagueIdAndRoundNr(Long leagueId, int roundNr);

  void deleteAllByLeagueId(Long leagueId);
}
