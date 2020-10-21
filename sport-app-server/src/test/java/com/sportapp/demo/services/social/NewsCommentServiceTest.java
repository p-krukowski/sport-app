package com.sportapp.demo.services.social;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.social.NewsComment;
import com.sportapp.demo.repo.NewsCommentRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class NewsCommentServiceTest {

  @Mock NewsCommentRepo newsCommentRepo;
  @InjectMocks NewsCommentService newsCommentService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldSave() {
    //given
    NewsComment newsComment = new NewsComment();

    //when
    when(newsCommentRepo.save(newsComment)).thenReturn(newsComment);
    newsCommentService.save(newsComment);
    //then
    verify(newsCommentRepo, times(1)).save(newsComment);
  }

}