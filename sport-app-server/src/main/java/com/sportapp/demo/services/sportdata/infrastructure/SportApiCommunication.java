package com.sportapp.demo.services.sportdata.infrastructure;

import com.sportapp.demo.models.dtos.sportdata.soccer.*;
import com.sportapp.demo.models.sportdata.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SportApiCommunication {

    private static final String LEAGUE_URL = "https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?";
    private static final String TEAMS_SCORE_URL = "https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?";
    private static final String ROUND_URL = "https://www.thesportsdb.com/api/v1/json/1/eventsround.php?";
    private static final String EVENT_URL = "https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?";

    private static final Long ENGLISH_PREMIER_LEAGUE_ID = 4328L;
    private static final Long GERMAN_BUNDESLIGA_ID = 4331L;
    private static final Long ITALIAN_SERIE_A_ID = 4332L;
    private static final Long FRENCH_LEAGUE_1_ID = 4334L;
    private static final Long POLISH_EKSTRAKLASA_ID = 4422L;
    private static final Long SPANISH_LA_LIGA_ID = 4335L;

    private final ModelMapper modelMapper;

    public SportApiCommunication(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    
    public List<EventSoccer> fetchEventsSoccerFromApi(RoundSoccer round) {
        RoundSoccerApiDto roundDto = new RestTemplate().getForObject(
                ROUND_URL + "id=" + round.getSeason().getLeague().getId()
                + "&r=" + round.getRoundNumber(), RoundSoccerApiDto.class);
        return convertRoundToEntity(roundDto).getEvents();
    }

    public EventSoccer fetchEventSoccerFromApi(EventSoccer event) {
        EventSoccerListDto eventDto = new RestTemplate().getForObject(
                EVENT_URL + "id=" + event.getId(), EventSoccerListDto.class);
        return convertEventToEntity(eventDto.getEvents().get(0));
    }

    private EventSoccer convertEventToEntity(EventSoccerApiDto eventSoccer) {
        return modelMapper.map(eventSoccer, EventSoccer.class);
    }

    public List<RoundSoccer> fetchRoundsSoccerFromApi(Long id) {
        List<RoundSoccer> rounds = new ArrayList<>();
        int roundNumber = 1;
        while (true) {
            RestTemplate restTemplate = new RestTemplate();
            RoundSoccerApiDto roundDto = restTemplate
                    .getForObject(ROUND_URL + "id=" + id + "&r=" + roundNumber, RoundSoccerApiDto.class);
            if (roundDto.getEvents() != null) {
                RoundSoccer round = convertRoundToEntity(roundDto);
                round.setRoundNumber(roundNumber);
                rounds.add(round);
            } else {
                break;
            }
            roundNumber++;
        }

        return rounds;
    }

    private RoundSoccer convertRoundToEntity(RoundSoccerApiDto round) {
        return modelMapper.map(round, RoundSoccer.class);
    }

    public List<LeagueSoccer> fetchLeaguesSoccerFromApi() {
        List<LeagueSoccer> leaguesSoccer = new ArrayList<>();
        fetchWantedIds().stream().forEach(leagueId ->
                leaguesSoccer
                        .add(convertLeagueToEntity(new RestTemplate()
                                .getForObject(LEAGUE_URL + "id=" + leagueId, LeaguesSoccerListDto.class)
                                .getLeagues()
                                .stream()
                                .findFirst()
                                .orElse(null))));
        return leaguesSoccer;
    }

    private LeagueSoccer convertLeagueToEntity(LeagueSoccerApiDto league) {
        return modelMapper.map(league, LeagueSoccer.class);
    }

    private List<Long> fetchWantedIds() {
        List<Long> wantedIds = new ArrayList<>();
        wantedIds.add(ENGLISH_PREMIER_LEAGUE_ID);
        wantedIds.add(GERMAN_BUNDESLIGA_ID);
        wantedIds.add(ITALIAN_SERIE_A_ID);
        wantedIds.add(FRENCH_LEAGUE_1_ID);
        wantedIds.add(POLISH_EKSTRAKLASA_ID);
        wantedIds.add(SPANISH_LA_LIGA_ID);
        return wantedIds;
    }

    public List<TeamScoreSoccer> fetchTeamScoreSoccerListFromApi(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        TeamScoreSoccerListApiDto teamScoreSoccerListApiDto = restTemplate.getForObject(TEAMS_SCORE_URL+"l="+id, TeamScoreSoccerListApiDto.class);

        return convertTablesToEntity(teamScoreSoccerListApiDto);
    }

    private List<TeamScoreSoccer> convertTablesToEntity(TeamScoreSoccerListApiDto teamScoreSoccerListApiDto) {
        List<TeamScoreSoccer> teams = new ArrayList<>();
        teamScoreSoccerListApiDto.getTeams().forEach(team ->
            teams.add(modelMapper.map(team, TeamScoreSoccer.class)));
        return teams;
    }
}
