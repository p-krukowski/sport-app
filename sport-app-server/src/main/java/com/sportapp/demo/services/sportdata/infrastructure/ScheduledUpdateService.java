package com.sportapp.demo.services.sportdata.infrastructure;

import com.sportapp.demo.services.sportdata.infrastructure.soccer.SoccerUpdateService;
import javax.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledUpdateService {

  private static final String LEAGUES_UPDATE_TIME = "0 0 3 ? * ?";
  private static final String TEAMS_UPDATE_TIME = "0 0/30 * ? * ?";
  private static final String EVENTS_UPDATE_TIME = "0 0/5 * ? * ?";
  private static final String YESTERDAY_EVENTS_UPDATE_TIME = "0 2 0 ? * ?";

  SoccerUpdateService soccerUpdateService;

  public ScheduledUpdateService(
      SoccerUpdateService soccerUpdateService) {
    this.soccerUpdateService = soccerUpdateService;
  }

  @Scheduled(cron = LEAGUES_UPDATE_TIME)
  @PostConstruct
  public void updateLeagues() {
    soccerUpdateService.updateLeagues();
  }

  @Scheduled(cron = TEAMS_UPDATE_TIME)
  public void updateTeams() {
    soccerUpdateService.updateTeams();
  }

  @Scheduled(cron = EVENTS_UPDATE_TIME)
  public void updateEvents() {
    soccerUpdateService.updateTodayEvents();
  }

  @Scheduled(cron = YESTERDAY_EVENTS_UPDATE_TIME)
  public void updateYesterdayEvents() {
    soccerUpdateService.updateYesterdayEvents();
  }

  @PostConstruct
  public void updateAllPastEvents() {
    soccerUpdateService.updateAllPastEvents();
  }
}
