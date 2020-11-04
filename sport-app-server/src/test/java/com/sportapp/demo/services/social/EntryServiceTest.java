package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

class EntryServiceTest {

  @Mock EntryRepo entryRepo;
  @Mock ModelMapper modelMapper;
  @Mock TagService tagService;
  @Mock UserService userService;
  @InjectMocks
  EntryService entryService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldFetchAllEntriesDtoSorted() {
    //given
    Entry entry = new Entry();
    entry.setId(1L);
    entry.setComments(new ArrayList<>());
    EntryGetDto entryGetDto = new EntryGetDto();
    entryGetDto.setId(1L);

    Type typeMap = new TypeToken<List<EntryGetDto>>() {
    }.getType();

    List<Entry> entries = Collections.singletonList(entry);

    //when
    when(entryRepo.findAll(PageRequest.of(
        0, 20, Sort.by(Sort.Direction.DESC, "createdAt"))))
        .thenReturn(entries);
    when(modelMapper.map(entries, typeMap))
        .thenReturn(Collections.singletonList(entryGetDto));
    List<EntryGetDto> entryDtos = entryService.fetchAllEntriesDtoSorted(0);

    //then
    assertFalse(entryDtos.isEmpty());
    assertEquals(entryGetDto, entryDtos.get(0));
  }

  @Test
  void shouldAddEntry() {
    //given
    EntryPostDto entryPostDto = new EntryPostDto();
    Long userId = 1L;

    //when
    when(userService.findUserById(userId)).thenReturn(new User());
    when(tagService.filterTagsFromText(entryPostDto.getContent())).thenReturn(new ArrayList<>());
    entryService.addEntry(entryPostDto, userId);

    //then
    verify(entryRepo, times(1)).save(any());
  }

  @Test
  void shouldUpvoteEntryWhenDoesNotHaveTheUpvoter() {
    //given
    Long entryId = 1L;
    Entry entry = new Entry();
    entry.setId(entryId);
    entry.setUpvoters(new ArrayList<>());

    //when
    when(entryRepo.findByIdWithUpvoters(entryId)).thenReturn(Optional.of(entry));
    when(entryRepo.save(entry)).thenReturn(entry);
    int upvotersAmount = entryService.upvoteEntry(entryId, new User());

    //then
    assertEquals(1, upvotersAmount);
  }

  @Test
  void shouldDeleteUpvoterFromEntryWhenHasTheUpvoter() {
    //given
    Long entryId = 1L;
    Entry entry = new Entry();
    entry.setId(entryId);
    entry.setUpvoters(new ArrayList<>());
    User user = new User();
    user.setId(1L);
    entry.setUpvoters(Collections.singletonList(user));

    //when
    when(entryRepo.findByIdWithUpvoters(entryId)).thenReturn(Optional.of(entry));
    when(entryRepo.save(entry)).thenReturn(entry);
    int upvotersAmount = entryService.upvoteEntry(entryId, user);

    //then
    assertEquals(0, upvotersAmount);
  }

  @Test
  void shouldFindEntryByIdWhenExists() {
    //given
    Long entryId = 1L;
    Entry entry = new Entry();
    entry.setId(entryId);

    //when
    when(entryRepo.findById(entryId)).thenReturn(Optional.of(entry));
    Entry foundEntry = entryService.findEntryById(entryId);

    //then
    assertEquals(entry, foundEntry);
  }

  @Test
  void shouldThrowEntityNotFoundExceptionWhenNotFoundById() {
    //given
    Long entryId = 1L;

    //when
    when(entryRepo.findById(entryId)).thenReturn(Optional.empty());

    //then
    assertThrows(EntityNotFoundException.class, () ->
        entryService.findEntryById(entryId));
  }

  @Test
  void shouldFindBestEntriesDto() {
    //given
    Entry entry = new Entry();
    entry.setComments(new ArrayList<>());
    List<Entry> entries = Collections.singletonList(entry);
    Type typeMap = new TypeToken<List<EntryGetDto>>() {
    }.getType();
    EntryGetDto entryGetDto = new EntryGetDto();

    //when
    when(entryRepo.findBest(PageRequest.of(
        0, 5, Sort.by(Sort.Direction.DESC, "createdAt", "score"))))
        .thenReturn(entries);
    when(modelMapper.map(entries, typeMap)).thenReturn(Collections.singletonList(entryGetDto));
    List<EntryGetDto> foundEntries = entryService.findBestEntriesDto();

    //then
    assertEquals(entries.size(), foundEntries.size());
  }

  @Test
  void shouldSave() {
    //given
    Entry entry = new Entry();

    //when
    when(entryRepo.save(entry)).thenReturn(entry);

    //then
    assertEquals(entry, entryService.save(entry));
  }

  @Test
  void shouldFindEntryByIdWithComments() {
    //given
    Long entryId = 1L;
    Entry entry = new Entry();

    //when
    when(entryRepo.findEntryByIdWithComments(entryId)).thenReturn(entry);

    //then
    assertEquals(entry, entryService.findEntryByIdWithComments(entryId));
  }
}