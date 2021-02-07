package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.CommentRepo;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

class CommentServiceTest {

  @Mock
  CommentRepo commentRepo;
  @Mock
  EntryService entryService;
  @Mock
  ModelMapper modelMapper;
  @InjectMocks
  CommentService commentService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldSaveWhenEntryCommentDoesNotHaveUpvoter() {
    //given
    Long commentId = 1L;
    Comment comment = new Comment();
    comment.setUpvoters(new ArrayList<>());
    User user = new User();
    user.setId(1L);

    //when
    when(commentRepo.findById(commentId)).thenReturn(Optional.of(comment));
    when(commentRepo.save(comment)).thenReturn(comment);
    commentService.upvoteComment(commentId, user);

    //then
    verify(commentRepo, times(1)).save(comment);
  }

  @Test
  void shouldSaveWhenEntryCommentHasUpvoter() {
    //given
    Long commentId = 1L;
    Comment comment = new Comment();
    comment.setUpvoters(new ArrayList<>());
    User user = new User();
    user.setId(1L);
    comment.setUpvoters(Collections.singletonList(user));

    //when
    when(commentRepo.findById(commentId)).thenReturn(Optional.of(comment));
    when(commentRepo.save(comment)).thenReturn(comment);
    commentService.upvoteComment(commentId, user);

    //then
    verify(commentRepo, times(1)).save(comment);
  }

  @Test
  void shouldAddComment() {
    //given
    Comment entryComment = new Comment();
    CommentPostDto commentDto = new CommentPostDto();
    Long entryId = 1L;
    Entry entry = new Entry();
    //when
    when(entryService.findEntryById(entryId)).thenReturn(entry);
    when(modelMapper.map(commentDto, Comment.class)).thenReturn(entryComment);
    entryService.addComment(entryId, commentDto, new User());

    //then
    verify(commentRepo, times(1)).save(entryComment);
  }

  @Test
  void shouldThrowEntityNotFoundExceptionWhenEntryDoesNotExist() {
    //given
    Comment comment = new Comment();
    CommentPostDto commentDto = new CommentPostDto();
    Long entryId = 1L;
    User user = new User();
    //when
    when(entryService.findEntryById(entryId)).thenThrow(new EntityNotFoundException());
    when(modelMapper.map(commentDto, Comment.class)).thenReturn(comment);

    //then
    assertThrows(EntityNotFoundException.class, () ->
        entryService.addComment(entryId, commentDto, user));
  }
}