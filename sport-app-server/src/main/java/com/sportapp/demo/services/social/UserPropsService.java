package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.User;
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

    public void addUserProps(UserProps userProps) {
        userPropsRepo.save(userProps);
    }


    public void updateLeagues(List<LeagueSoccer> leagues, User user) {
        UserProps userProps = user.getUserProps();
        userProps.setLeagues(leagues);

        userPropsRepo.save(userProps);
    }
}
