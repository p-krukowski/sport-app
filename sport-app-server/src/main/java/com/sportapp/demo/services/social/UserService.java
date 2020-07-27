package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class UserService  {

    private final UserRepo userRepo;
    private final UserPropsService userPropsService;

    @Autowired
    public UserService(UserRepo userRepo, UserPropsService userPropsService) {
        this.userRepo = userRepo;
        this.userPropsService = userPropsService;
    }

    public User findUserById(Long id) {
        return  userRepo.findById(id).orElseThrow(() -> new NullPointerException("User not found"));
    }

    public void addUser(User user) {
        UserProps userProps = new UserProps();
        user.setUserProps(userProps);
        userPropsService.addUserProps(userProps);
        userRepo.save(user);
    }

    public Boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    public Boolean existsByMail(String mail) {
        return userRepo.existsByMail(mail);
    }

    public void addLikedEntry(Long userId, Entry entry) {
        addEntryToDb(userId, entry);
    }

    private void addEntryToDb(Long userId, Entry entry) {
        User user = userRepo.findById(userId).orElseThrow(EntityNotFoundException::new);
        user.addLikedEntry(entry);
        userRepo.save(user);
    }

    public void removeLikedEntry(Long userId, Entry entry) {
        removeEntryFromDb(userId, entry);
    }

    public void removeEntryFromDb(Long userId, Entry entry) {
        User user = userRepo.findById(userId).orElseThrow(EntityNotFoundException::new);
        user.removeLikedEntry(entry);
        userRepo.save(user);
    }
}
