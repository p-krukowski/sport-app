package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import com.sportapp.demo.repo.UserPropsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPropsService {

    private final UserPropsRepo userPropsRepo;

    @Autowired
    public UserPropsService(UserPropsRepo userPropsRepo) {
        this.userPropsRepo = userPropsRepo;
    }

    public List<LeagueSoccer> findLeaguesByUserId(Long id) {
        return userPropsRepo.findLeaguesByUserId(id);
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
