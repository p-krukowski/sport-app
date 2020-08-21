package com.sportapp.demo.services.sportdata;


import com.sportapp.demo.models.sportdata.RoundSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.repo.RoundSoccerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoundSoccerService {

    RoundSoccerRepo roundSoccerRepo;

    @Autowired
    public RoundSoccerService(RoundSoccerRepo roundSoccerRepo) {
        this.roundSoccerRepo = roundSoccerRepo;
    }

    public RoundSoccer findByRoundNumberAndSeason(int roundNumber, SeasonSoccer season) {
        return roundSoccerRepo.findByRoundNumberAndSeason(roundNumber, season);
    }

    public void saveAllRoundsToDb(List<RoundSoccer> rounds) {
        roundSoccerRepo.saveAll(rounds);
    }

    public List<RoundSoccer> findAll() {
        return roundSoccerRepo.findAll();
    }

    public int findRoundsAmountByLeagueId(Long leagueId) {
        return roundSoccerRepo.findRoundsAmountByLeagueId(leagueId);
    }
    
    public RoundSoccer findById(Long roundNumber) {
        return roundSoccerRepo.findById(roundNumber).orElse(null);
    }
}
