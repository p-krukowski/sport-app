package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    return new ArrayList<>(entryRepo.findAll(PageRequest.of(page, 20,
        Sort.by(Sort.Direction.DESC, "createdAt"))));
  }

  public void addEntry(EntryPostDto entryPostDto, Long userId) {
    Entry entry = new Entry();
    entry.setValue(entryPostDto.getValue());
    entry.setAuthor(userService.findUserById(userId));
    List<Tag> tags = tagService.filterTagsFromText(entryPostDto.getValue());
    entry.setTags(tags);
    entry.setImageUrl(entryPostDto.getImageUrl());
    entryRepo.save(entry);
  }

  public int upvoteEntry(Long entryId, User user) {
    Optional<Entry> entryOptional = entryRepo.findByIdWithUpvoters(entryId);
    if (entryOptional.isPresent()) {
      return updateUpvoters(entryOptional, user);
    } else {
      return 0;
    }
  }

  private int updateUpvoters(Optional<Entry> entryOptional, User user) {
    Entry entry = entryOptional.get();
    List<User> likers = entry.getUpvoters();
    if (likers.contains(user)) {
      likers.remove(user);
    } else {
      likers.add(user);
    }
    entry.setScore(likers);
    entryRepo.save(entry);
    return entry.getUpvoters().size();
  }

  public Entry findEntryById(Long entryId) {
    return entryRepo.findById(entryId)
        .orElseThrow(() -> new NullPointerException("Entry not found"));
  }

  public List<Entry> findBest() {
    return entryRepo.findBest(PageRequest.of(
        0, 5, Sort.by(Sort.Direction.DESC, "createdAt", "score")));
  }

  public Entry save(Entry entry) {
    return entryRepo.save(entry);
  }

  public Entry findEntryByIdWithComments(Long entryId) {
    return entryRepo.findEntryByIdWithComments(entryId);
  }
}
