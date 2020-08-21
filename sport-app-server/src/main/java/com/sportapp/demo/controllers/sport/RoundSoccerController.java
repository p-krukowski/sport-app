package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.services.sportdata.RoundSoccerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/soccer/rounds")
public class RoundSoccerController {

    RoundSoccerService roundSoccerService;

    public RoundSoccerController(RoundSoccerService roundSoccerService) {
        this.roundSoccerService = roundSoccerService;
    }

    @GetMapping("/amount/l={leagueId}")
    public int fetchRoundsAmountByLeagueId(@PathVariable Long leagueId) {
        return roundSoccerService.findRoundsAmountByLeagueId(leagueId);
    }
}
