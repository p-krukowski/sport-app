package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.models.sportdata.SeasonSoccer;
import com.sportapp.demo.repo.SeasonSoccerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeasonSoccerService {

    SeasonSoccerRepo seasonSoccerRepo;
    LeagueSoccerService leagueSoccerService;

    @Autowired
    public SeasonSoccerService(SeasonSoccerRepo seasonSoccerRepo, LeagueSoccerService leagueSoccerService) {
        this.seasonSoccerRepo = seasonSoccerRepo;
        this.leagueSoccerService = leagueSoccerService;
    }

    public void save(SeasonSoccer seasonSoccer) {
        seasonSoccerRepo.save(seasonSoccer);
    }

    public List<SeasonSoccer> findAll() {
        return seasonSoccerRepo.findAll();
    }

    public SeasonSoccer findByLeagueAndSeason(LeagueSoccer league, String season) {
        return seasonSoccerRepo.findByLeagueAndSeason(league, season).orElse(null);
    }

    public SeasonSoccer findByLeagueAndSeasonOrNew(Long leagueId) {
        SeasonSoccer season;
        try {
            LeagueSoccer league = leagueSoccerService.findById(leagueId);
            season = findByLeagueAndSeason(league, league.getCurrentSeason());
        } catch (NullPointerException e) {
            season = new SeasonSoccer();
            season.setTeams(new ArrayList<>());
        }
        return season;
    }
}
