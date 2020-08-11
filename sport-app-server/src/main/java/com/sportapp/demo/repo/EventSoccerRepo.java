package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventSoccerRepo extends JpaRepository<EventSoccer, Long> {

    List<EventSoccer> findAllByDate(LocalDate date);

    @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
            ".EventSoccerGetDto(e.homeTeamName, e.awayTeamName, e.homeScore, e.awayScore, e.date) from EventSoccer e" +
            " where e.league.id = ?1 and e.date < ?2")
    List<EventSoccerGetDto> findRecentByLeagueId(Long leagueId, LocalDate now, Pageable pageable);

    @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
            ".EventSoccerGetDto(e.homeTeamName, e.awayTeamName, e.homeScore, e.awayScore, e.date) from EventSoccer e" +
            " where e.league.id = ?1 and e.date > ?2")
    List<EventSoccerGetDto> findNextByLeagueId(Long leagueId, LocalDate now, Pageable pageable);
}
