package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import com.sportapp.demo.services.mappers.CommentMapper;
import com.sportapp.demo.services.mappers.EntryMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EntryService {

  private final EntryRepo entryRepo;
  private final UserService userService;
  private final TagService tagService;

  public EntryService(EntryRepo entryRepo, UserService userService, TagService tagService) {
    this.entryRepo = entryRepo;
    this.userService = userService;
    this.tagService = tagService;
  }

  public List<EntryGetDto> fetchAllEntriesDtoSorted(int page) {
    page = page < 1 ? 0 : page - 1;
    List<Entry> entries = entryRepo.findAll(PageRequest.of(
        page, 20, Sort.by(Sort.Direction.DESC, "createdAt")));
    return entries.stream()
        .map(EntryMapper::mapEntityToDto)
        .collect(Collectors.toList());
  }

  public void addEntry(EntryPostDto entryPostDto, Long userId) {
    Entry entry = new Entry();
    entry.setContent(entryPostDto.getContent());
    entry.setAuthor(userService.findUserById(userId));
    List<Tag> tags = tagService.filterTagsFromText(entryPostDto.getContent());
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
    return entries.stream()
        .map(EntryMapper::mapEntityToDto)
        .collect(Collectors.toList());
  }

  @Transactional
  public ResponseEntity<?> addComment(Long entryId, CommentPostDto commentPostDto,
      User currentUser) {
    try {
      Entry entry = findEntryById(entryId);
      entry.getComments()
          .add(CommentMapper.mapDtoToEntity(commentPostDto, currentUser));
      entryRepo.save(entry);
      return new ResponseEntity<>(HttpStatus.CREATED);
    } catch (EntityNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  public List<CommentGetDto> findAllComments(Long entryId) {
    try {
      return findEntryById(entryId).getComments().stream()
          .map(CommentMapper::mapEntityToDto)
          .collect(Collectors.toList());
    } catch (EntityNotFoundException e) {
      return new ArrayList<>();
    }
  }

  public Entry save(Entry entry) {
    return entryRepo.save(entry);
  }

  private int updateUpvoters(Entry entry, User user) {
    PostService.updateUpvoters(entry, user);
    return entryRepo.save(entry).getUpvoters().size();
  }
}
