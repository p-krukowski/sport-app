package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EntryService {

    private final EntryRepo entryRepo;
    private final UserService userService;
    private final TagService tagService;

    @Autowired
    public EntryService(EntryRepo entryRepo, UserService userService, TagService tagService) {
        this.entryRepo = entryRepo;
        this.userService = userService;
        this.tagService = tagService;
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
        List<Tag> tags = filterTagsFromText(value);
        entry.setTags(tags);
        tagService.saveAll(tags);
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

    public void removeLiker(Long entryId, Long userId) {
        Entry entry = removeLikerFromDb(entryId, userId);
        userService.removeLikedEntry(userId, entry);
    }

    public int findEntryScoreById(Long entryId) {
        Entry entry = entryRepo.findById(entryId).orElseThrow(EntityNotFoundException::new);
        return entry.getScore();
    }

    public Entry findEntryById(Long entryId) {
        return entryRepo.findById(entryId).orElseThrow(() -> new NullPointerException("Entry not found"));
    }

    public List<EntryGetDto> findBest() {
        return entryRepo.findBest(PageRequest.of(
            0, 3, Sort.by(Sort.Direction.DESC, "score", "createdAt")));
    }

    private List<Tag> filterTagsFromText(String text) {
        List<Tag> tags = new ArrayList<>();
        String[] strings = text.split(" ");
        List<String> tagsNames = getTagsNames(strings);
        createTags(tags, tagsNames);
        return tags;
    }

    private void createTags(List<Tag> tags, List<String> tagsNames) {
        tagsNames.forEach(tagName -> {
            Tag tag = new Tag();
            tag.setName(tagName);
            tags.add(tag);
        });
    }

    private List<String> getTagsNames(String[] strings) {
        return Arrays.stream(strings)
            .filter(s -> s.matches("#[\\w]{3,}"))
            .map(s -> s.substring(1).toLowerCase())
            .distinct()
            .collect(Collectors.toList());
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
}
