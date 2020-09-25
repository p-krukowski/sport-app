package com.sportapp.demo.services.sportdata.infrastructure.soccer;

import com.sportapp.demo.models.dtos.sportdata.soccer.EventSoccerListDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.LeagueSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.LeaguesSoccerListDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.RoundSoccerApiDto;
import com.sportapp.demo.models.dtos.sportdata.soccer.TeamScoreSoccerListApiDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SoccerApiCommunication {

  private static final String LEAGUE_URL = "https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?";
  private static final String TEAMS_SCORE_URL = "https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?";
  private static final String ROUND_URL = "https://www.thesportsdb.com/api/v1/json/1/eventsround.php?";
  private static final String EVENT_URL = "https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?";

  public EventSoccerListDto fetchEvent(Long eventId) {
    return new RestTemplate().getForObject(
        EVENT_URL + "id=" + eventId, EventSoccerListDto.class);
  }

  public RoundSoccerApiDto fetchRound(int roundNumber, Long leagueId) {
    return new RestTemplate()
        .getForObject(ROUND_URL + "id=" + leagueId + "&r=" + roundNumber, RoundSoccerApiDto.class);
  }

  public String fetchLeagueCurrentSeason(Long leagueId) {
    Optional<LeagueSoccerApiDto> leagueSoccerOpt = new RestTemplate()
        .getForObject(LEAGUE_URL + "id=" + leagueId, LeaguesSoccerListDto.class)
        .getLeagues()
        .stream()
        .findAny();
    return leagueSoccerOpt.map(LeagueSoccerApiDto::getCurrentSeason).orElse(null);
  }

  public TeamScoreSoccerListApiDto fetchLeagueTeams(LeagueSoccer league) {
    return new RestTemplate()
        .getForObject(TEAMS_SCORE_URL + "l=" + league.getExternalId() + "&s=" + league.getCurrentSeason(),
            TeamScoreSoccerListApiDto.class);
  }
}
