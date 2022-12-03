package com.sportapp.demo.controllers.sport;

import com.sportapp.demo.services.sportdata.LeagueSoccerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sport/disciplines")
@RequiredArgsConstructor
class DisciplinesController {

  LeagueSoccerService leagueSoccerService;

  @GetMapping("/all")
  List<String> fetchDisciplines() {
    return leagueSoccerService.findAllDisciplines();
  }
}
