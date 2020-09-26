package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.EventSoccerGetDto;
import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.repo.EventSoccerRepo;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EventSoccerService {

  EventSoccerRepo eventSoccerRepo;

  @Autowired
  public EventSoccerService(EventSoccerRepo eventSoccerRepo) {
    this.eventSoccerRepo = eventSoccerRepo;
  }

  public EventSoccer findById(Long id) {
    return eventSoccerRepo.findById(id).orElse(null);
  }

  public List<EventSoccer> findAllByDate(LocalDate date) {
    return eventSoccerRepo.findAllByDate(date);
  }

  public void saveAll(List<EventSoccer> events) {
    eventSoccerRepo.saveAll(events);
  }

  public void save(EventSoccer event) {
    eventSoccerRepo.save(event);
  }

  public List<EventSoccerGetDto> findRecentByLeagueId(Long leagueId) {
    return eventSoccerRepo.findRecentByLeagueId(leagueId, LocalDateTime.now(),
        PageRequest.of(0, 5, Sort.Direction.DESC, "dateTime"));
  }

  public List<EventSoccerGetDto> findNextByLeagueId(Long leagueId) {
    return eventSoccerRepo.findNextByLeagueId(leagueId, LocalDateTime.now(),
        PageRequest.of(0, 5, Sort.Direction.ASC, "dateTime"));
  }

  public List<EventSoccerGetDto> findEventsDtosByLeagueIdAndRoundNr(Long leagueId, int roundNr) {
    return eventSoccerRepo.findEventsDtosByLeagueIdAndRoundNr(leagueId, roundNr);
  }

  public void deleteAllByLeagueId(Long leagueId) {
    eventSoccerRepo.deleteAllByLeagueId(leagueId);
  }
}
