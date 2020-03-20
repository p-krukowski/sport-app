package com.sportapp.demo.services;

import com.google.gson.Gson;
import com.sportapp.demo.models.Entry;
import com.sportapp.demo.models.User;
import com.sportapp.demo.repo.EntryRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntryService {

    private EntryRepo entryRepo;
    private UserService userService;

    @Autowired
    public EntryService(EntryRepo entryRepo, UserService userService) {
        this.entryRepo = entryRepo;
        this.userService = userService;
    }

    public void addEntry(Entry entry, Long id) {
        entry.setAuthor(userService.getUserById(id));
        entryRepo.save(entry);
    }

    public List<Entry> getAllEntriesSorted() {
        List<Entry> entries = new ArrayList<>(entryRepo.findAll(Sort.by(Sort.Direction.DESC, "entryTime")));
        return entries;
    }

    private void addLiker(Long entryId, Long userId) {
        Entry entry = addLikerToDb(entryId, userId);
        userService.addLikedEntry(userId, entry);
    }

    private Entry addLikerToDb(Long entryId, Long userId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        List<User> likers = addLikerToEntry(entry, userId);
        entry.update(likers, 1);
        entryRepo.save(entry);
        return entry;
    }

    private List<User> addLikerToEntry(Entry entry, Long userId) {
        List<User> likers = entry.getLikers();
        likers.add(userService.getUserById(userId));
        return likers;
    }

    private void removeLiker(Long entryId, Long userId) {
        Entry entry = removeLikerFromDb(entryId, userId);
        userService.removeLikedEntry(userId, entry);
    }

    private Entry removeLikerFromDb(Long entryId, Long userId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        List<User> likers = removeLikerFromEntry(entry, userId);
        entry.update(likers, -1);
        entryRepo.save(entry);
        return entry;
    }

    private List<User> removeLikerFromEntry(Entry entry, Long userId) {
        List<User> likers = entry.getLikers();
        likers.remove(userService.getUserById(userId));
        return likers;
    }

    public int checkLikerStatus(Long entryId, Long userId) {
        User user = userService.getUserById(userId);
        if(entryRepo.findByIdAndLikers(entryId, user) == null)  addLiker(entryId, userId);
        else removeLiker(entryId, userId);
        return getEntryScore(entryId);
    }

    private int getEntryScore(Long entryId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        return entry.getScore();
    }
}
