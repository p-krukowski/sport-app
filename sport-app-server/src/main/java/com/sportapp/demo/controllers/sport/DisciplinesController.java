package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sport/disciplines")
public class DisciplinesController {

    LeagueSoccerService leagueSoccerService;

    public DisciplinesController(LeagueSoccerService leagueSoccerService) {
        this.leagueSoccerService = leagueSoccerService;
    }

    @GetMapping("/all")
    public List<String> fetchDisciplines() {
        return leagueSoccerService.findAllDisciplines();
    }
}
