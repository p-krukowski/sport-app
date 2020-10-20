package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EntryService {

  private final ModelMapper modelMapper;
  private final EntryRepo entryRepo;
  private final UserService userService;
  private final TagService tagService;

  public EntryService(EntryRepo entryRepo, UserService userService, TagService tagService,
      ModelMapper modelMapper) {
    this.entryRepo = entryRepo;
    this.userService = userService;
    this.tagService = tagService;
    this.modelMapper = modelMapper;
  }

  public List<EntryGetDto> fetchAllEntriesDtoSorted(int page) {
    page = page < 1 ? 0 : page - 1;
    List<Entry> entries = entryRepo.findAll(PageRequest.of(
        page, 20, Sort.by(Sort.Direction.DESC, "createdAt")));
    return convertToDto(entries);
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

  @Transactional
  public int upvoteEntry(Long entryId, User user) {
    Optional<Entry> entryOptional = entryRepo.findByIdWithUpvoters(entryId);
    return entryOptional.map(entry -> updateUpvoters(entry, user)).orElse(0);
  }

  public Entry findEntryById(Long entryId) {
    return entryRepo.findById(entryId)
        .orElseThrow(() -> new EntityNotFoundException("Entry not found"));
  }

  public List<EntryGetDto> findBestEntriesDto() {
    List<Entry> entries = entryRepo.findBest(PageRequest.of(
        0, 5, Sort.by(Sort.Direction.DESC, "createdAt", "score")));
    return convertToDto(entries);
  }

  public Entry save(Entry entry) {
    return entryRepo.save(entry);
  }

  public Entry findEntryByIdWithComments(Long entryId) {
    return entryRepo.findEntryByIdWithComments(entryId);
  }

  private int updateUpvoters(Entry entry, User user) {
    List<Long> upvoters = entry.getUpvoters().stream()
        .map(User::getId)
        .collect(Collectors.toList());
    if (upvoters.contains(user.getId())) {
      entry.setUpvoters(entry.getUpvoters().stream()
          .filter(upvoter -> !upvoter.getId().equals(user.getId()))
          .collect(Collectors.toList()));
    } else {
      entry.getUpvoters().add(user);
    }
    entry.setScore(entry.getUpvoters().size());
    return entryRepo.save(entry).getUpvoters().size();
  }

  private List<EntryGetDto> convertToDto(List<Entry> entries) {
    Type typeMap = new TypeToken<List<EntryGetDto>>() {
    }.getType();
    List<EntryGetDto> entriesDto = modelMapper.map(entries, typeMap);
    for (int i = 0; i < entries.size(); i++) {
      entriesDto.get(i).setCommentsAmount(
          entries.get(i).getComments().size()
      );
    }
    return entriesDto;
  }
}
