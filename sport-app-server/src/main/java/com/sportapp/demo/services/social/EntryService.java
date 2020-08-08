package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntryService {

    private final EntryRepo entryRepo;
    private final UserService userService;

    @Autowired
    public EntryService(EntryRepo entryRepo, UserService userService) {
        this.entryRepo = entryRepo;
        this.userService = userService;
    }

    public List<Entry> fetchAllEntriesSorted(int page) {
        page = page < 1 ? 0 : page - 1;
        return new ArrayList<>(entryRepo.findAll(PageRequest.of(page,20,
                Sort.by(Sort.Direction.DESC, "createdAt")) ));
    }

    public void addEntry(String value, Long userId) {
        Entry entry = new Entry();
        entry.setValue(value);
        entry.setAuthor(userService.findUserById(userId));
        entryRepo.save(entry);
    }

    public boolean isNotLiked(Long entryId, Long userId) {
        User user = userService.findUserById(userId);
        return entryRepo.findByIdAndLikers(entryId, user) == null;
    }

    public void addLiker(Long entryId, Long userId) {
        Entry entry = addLikerToDb(entryId, userId);
        userService.addLikedEntry(userId, entry);
    }

    private Entry addLikerToDb(Long entryId, Long userId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        List<User> likers = addLikerToEntry(entry, userId);
        entry.setScore(likers);
        return entryRepo.save(entry);
    }

    private List<User> addLikerToEntry(Entry entry, Long userId) {
        List<User> likers = entry.getLikers();
        likers.add(userService.findUserById(userId));
        return likers;
    }

    public void removeLiker(Long entryId, Long userId) {
        Entry entry = removeLikerFromDb(entryId, userId);
        userService.removeLikedEntry(userId, entry);
    }

    private Entry removeLikerFromDb(Long entryId, Long userId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        List<User> likers = removeLikerFromEntry(entry, userId);
        entry.setScore(likers);
        return entryRepo.save(entry);
    }

    private List<User> removeLikerFromEntry(Entry entry, Long userId) {
        List<User> likers = entry.getLikers();
        likers.remove(userService.findUserById(userId));
        return likers;
    }

    public int findEntryScoreById(Long entryId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        return entry.getScore();
    }

    public Entry findEntryById(Long entryId) {
        return entryRepo.findById(entryId).orElseThrow(() -> new NullPointerException("Entry not found"));
    }
}
