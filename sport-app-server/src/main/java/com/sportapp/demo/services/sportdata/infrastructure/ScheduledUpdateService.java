package com.sportapp.demo.services.sportdata.infrastructure;

import com.sportapp.demo.services.sportdata.infrastructure.soccer.SoccerUpdateService;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class ScheduledUpdateService {

  private static final String LEAGUES_UPDATE_TIME = "0 0 3 ? * ?";
  private static final String TEAMS_UPDATE_TIME = "0 0/30 * ? * ?";
  private static final String EVENTS_UPDATE_TIME = "0 0/5 * ? * ?";
  private static final String YESTERDAY_EVENTS_UPDATE_TIME = "0 2 0 ? * ?";

  private final SoccerUpdateService soccerUpdateService;

  @Scheduled(cron = LEAGUES_UPDATE_TIME)
  @PostConstruct
  void updateLeagues() {
    soccerUpdateService.updateLeagues();
  }

  @Scheduled(cron = TEAMS_UPDATE_TIME)
  void updateTeams() {
    soccerUpdateService.updateTeams();
  }

  @Scheduled(cron = EVENTS_UPDATE_TIME)
  void updateEvents() {
    soccerUpdateService.updateTodayEvents();
  }

  @Scheduled(cron = YESTERDAY_EVENTS_UPDATE_TIME)
  void updateYesterdayEvents() {
    soccerUpdateService.updateYesterdayEvents();
  }

  @PostConstruct
  void updateAllPastEvents() {
    soccerUpdateService.updateAllPastEvents();
  }
}
