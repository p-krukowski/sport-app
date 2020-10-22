package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.social.EntryCommentPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.EntryComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryCommentRepo;
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

class EntryCommentServiceTest {

  @Mock
  EntryCommentRepo entryCommentRepo;
  @Mock
  EntryService entryService;
  @Mock
  ModelMapper modelMapper;
  @InjectMocks
  EntryCommentService entryCommentService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldSaveWhenEntryCommentDoesNotHaveUpvoter() {
    //given
    Long commentId = 1L;
    EntryComment entryComment = new EntryComment();
    entryComment.setUpvoters(new ArrayList<>());
    User user = new User();
    user.setId(1L);

    //when
    when(entryCommentRepo.findById(commentId)).thenReturn(Optional.of(entryComment));
    when(entryCommentRepo.save(entryComment)).thenReturn(entryComment);
    entryCommentService.upvoteEntry(commentId, user);

    //then
    verify(entryCommentRepo, times(1)).save(entryComment);
  }

  @Test
  void shouldSaveWhenEntryCommentHasUpvoter() {
    //given
    Long commentId = 1L;
    EntryComment entryComment = new EntryComment();
    entryComment.setUpvoters(new ArrayList<>());
    User user = new User();
    user.setId(1L);
    entryComment.setUpvoters(Collections.singletonList(user));

    //when
    when(entryCommentRepo.findById(commentId)).thenReturn(Optional.of(entryComment));
    when(entryCommentRepo.save(entryComment)).thenReturn(entryComment);
    entryCommentService.upvoteEntry(commentId, user);

    //then
    verify(entryCommentRepo, times(1)).save(entryComment);
  }

  @Test
  void shouldAddComment() {
    //given
    EntryComment entryComment = new EntryComment();
    EntryCommentPostDto commentDto = new EntryCommentPostDto();
    Long entryId = 1L;
    Entry entry = new Entry();
    //when
    when(entryService.findEntryById(entryId)).thenReturn(entry);
    when(modelMapper.map(commentDto, EntryComment.class)).thenReturn(entryComment);
    entryCommentService.addCommentDto(entryId, commentDto, new User());

    //then
    verify(entryCommentRepo, times(1)).save(entryComment);
  }

  @Test
  void shouldThrowEntityNotFoundExceptionWhenEntryDoesNotExist() {
    //given
    EntryComment entryComment = new EntryComment();
    EntryCommentPostDto commentDto = new EntryCommentPostDto();
    Long entryId = 1L;
    User user = new User();
    //when
    when(entryService.findEntryById(entryId)).thenThrow(new EntityNotFoundException());
    when(modelMapper.map(commentDto, EntryComment.class)).thenReturn(entryComment);

    //then
    assertThrows(EntityNotFoundException.class, () ->
        entryCommentService.addCommentDto(entryId, commentDto, user));
  }

  @Test
  void shouldFindAllByEntryId() {
    //when
    when(entryCommentRepo.findAllByEntryId(1L)).thenReturn(new ArrayList<>());
    List<EntryComment> entryComments = entryCommentService.findAllByEntryId(1L);

    //then
    assertEquals(0, entryComments.size());
  }

}