package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.models.sportdata.TeamScoreSoccer;
import com.sportapp.demo.repo.TeamScoreSoccerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamScoreSoccerService {

    TeamScoreSoccerRepo teamScoreSoccerRepo;

    @Autowired
    public TeamScoreSoccerService(TeamScoreSoccerRepo teamScoreSoccerRepo) {
        this.teamScoreSoccerRepo = teamScoreSoccerRepo;
    }

    public List<TeamScoreSoccer> findAll() {
        return teamScoreSoccerRepo.findAll();
    }

    public TeamScoreSoccer findByTeamIdAndSeason(String teamId, SeasonSoccer season) {
        return teamScoreSoccerRepo.findByTeamIdAndSeason(teamId, season);
    }
    
    public void saveAllTeamsToDb(List<TeamScoreSoccer> teams) {
        teamScoreSoccerRepo.saveAll(teams);
    }
}
