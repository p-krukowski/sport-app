package com.sportapp.demo.services.sportdata;


import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.repo.RoundSoccerRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoundSoccerService {

  RoundSoccerRepo roundSoccerRepo;

  @Autowired
  public RoundSoccerService(RoundSoccerRepo roundSoccerRepo) {
    this.roundSoccerRepo = roundSoccerRepo;
  }

  public void saveAll(List<RoundSoccer> rounds) {
    roundSoccerRepo.saveAll(rounds);
  }

  public List<RoundSoccer> findAll() {
    return roundSoccerRepo.findAll();
  }

  public int findRoundsAmountByLeagueId(Long leagueId) {
    return roundSoccerRepo.findRoundsAmountByLeagueId(leagueId);
  }

  public void deleteAllByLeagueId(Long leagueId) {
    roundSoccerRepo.deleteAllByLeagueId(leagueId);
  }
}
