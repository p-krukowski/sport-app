package com.sportapp.demo.services;

import com.sportapp.demo.models.Entry;
import com.sportapp.demo.models.User;
import com.sportapp.demo.repo.UserRepo;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserService  {

    private UserRepo userRepo;
    private UserPropsService userPropsService;
    private User user;

    @Autowired
    public UserService(UserRepo userRepo, UserPropsService userPropsService) {
        this.userRepo = userRepo;
        this.userPropsService = userPropsService;
    }

//    public User getUser(String username) {
//         return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
//    }

    public User getUserById(Long id) {
        return  userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void addUser(User user) {
        userPropsService.addUserProps(user);
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
        user.addEntry(entry);
        userRepo.save(user);
    }

    public void removeLikedEntry(Long userId, Entry entry) {
        removeEntryFromDb(userId, entry);
    }

    public void removeEntryFromDb(Long userId, Entry entry) {
        User user = userRepo.findById(userId).orElseThrow(EntityNotFoundException::new);
        user.removeEntry(entry);
        userRepo.save(user);
    }
}
