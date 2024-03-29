package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.repo.LeagueSoccerRepo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeagueSoccerService {

  private final LeagueSoccerRepo leagueSoccerRepo;
  private final EventSoccerService eventSoccerService;

  public void saveAll(List<LeagueSoccer> leagueSoccerList) {
    leagueSoccerRepo.saveAll(leagueSoccerList);
  }

  public LeagueSoccer save(LeagueSoccer leagueSoccer) {
    return leagueSoccerRepo.save(leagueSoccer);
  }

  public List<LeagueSoccer> fetchAllLeaguesFromDb() {
    return leagueSoccerRepo.findAll();
  }

  public LeagueSoccer findById(Long leagueId) {
    return leagueSoccerRepo.findById(leagueId).orElse(null);
  }

  public LeagueSoccerGetDto findGetDtoById(Long id) {
    return leagueSoccerRepo.findGetDtoById(id);
  }

  public List<LeagueSoccer> findAllLeaguesByDiscipline(String discipline) {
    return leagueSoccerRepo.findAllByDiscipline(discipline);
  }

  public List<LeagueSoccer> findAll() {
    return leagueSoccerRepo.findAll();
  }

  public List<LeagueSoccerGetDto> findAllGetDtos() {
    return leagueSoccerRepo.findAllGetDtoById();
  }

  public List<LeagueSoccer> findAllById(List<Long> leaguesIds) {
    return leagueSoccerRepo.findAllByIdIn(leaguesIds);
  }

  public List<String> findAllDisciplines() {
    return leagueSoccerRepo.findAllDisciplines()
        .stream()
        .map(String::toLowerCase)
        .collect(Collectors.toList());
  }

  public List<Long> findAllIds() {
    return leagueSoccerRepo.findAllIds();
  }

  public int findRoundsAmountById(Long leagueId) {
    return eventSoccerService.findLastRoundNumberByLeagueId(leagueId);
  }
}
