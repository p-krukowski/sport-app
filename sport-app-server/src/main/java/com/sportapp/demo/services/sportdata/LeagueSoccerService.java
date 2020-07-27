package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.repo.LeagueSoccerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueSoccerService {

    LeagueSoccerRepo leagueSoccerRepo;

    public LeagueSoccerService(LeagueSoccerRepo leagueSoccerRepo) {
        this.leagueSoccerRepo = leagueSoccerRepo;
    }

    public void saveAll(List<LeagueSoccer> leagueSoccerList) {
        leagueSoccerRepo.saveAll(leagueSoccerList);
    }

    public void save(LeagueSoccer leagueSoccer) {
        leagueSoccerRepo.save(leagueSoccer);
    }

    public List<LeagueSoccer> fetchAllLeaguesFromDb() {
        return leagueSoccerRepo.findAll();
    }

    public LeagueSoccer findById(Long leagueId) {
        return leagueSoccerRepo.findById(leagueId).orElse(null);
    }

    public List<LeagueSoccer> findAllLeaguesByDiscipline(String discipline) {
        return leagueSoccerRepo.findAllByDiscipline(discipline);
    }

    public List<LeagueSoccer> findAll() {
        return leagueSoccerRepo.findAll();
    }

    public List<LeagueSoccer> findAllById(List<Long> leaguesIds) {
        return leagueSoccerRepo.findAllById(leaguesIds);
    }
}
