package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.models.sportdata.League;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.repo.UserPropsRepo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPropsService {

  private final UserPropsRepo userPropsRepo;
  private final ModelMapper modelMapper;

  public List<LeagueSoccerGetDto> findLeaguesDtosByUserId(Long id) {
    return userPropsRepo.findLeaguesByUserId(id)
        .stream()
        .map(league -> modelMapper.map(league, LeagueSoccerGetDto.class))
        .collect(Collectors.toList());
  }

  public List<Long> findLeaguesIdsByUserId(Long id) {
    return userPropsRepo.findLeaguesByUserId(id)
        .stream()
        .map(League::getId)
        .collect(Collectors.toList());
  }

  public void save(UserProps userProps) {
    userPropsRepo.save(userProps);
  }

  public UserProps findByUserId(Long userId) {
    return userPropsRepo.findByUserId(userId);
  }

  public void updateLeagues(List<LeagueSoccer> leagues, Long userId) {
    UserProps userProps = findByUserId(userId);
    userProps.setLeagues(leagues);

    userPropsRepo.save(userProps);
  }
}
