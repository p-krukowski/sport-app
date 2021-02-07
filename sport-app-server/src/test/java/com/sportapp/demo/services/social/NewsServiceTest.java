package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.NewsRepo;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

class NewsServiceTest {

  @Mock
  NewsRepo newsRepo;
  @Mock
  UserService userService;
  @Mock
  TagService tagService;
  @Mock
  ModelMapper modelMapper;
  @InjectMocks
  NewsService newsService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldFindAllByPageWhenPageNegative() {
    //given
    int page = -1;
    NewsGetDto newsGetDto = new NewsGetDto();

    //when
    when(newsRepo.findAllNews(PageRequest.of(0, 20, Sort.by(Sort.Order.desc("createdAt")))))
        .thenReturn(Collections.singletonList(newsGetDto));
    newsService.findAll(page);

    //then
    verify(newsRepo, times(1))
        .findAllNews(PageRequest.of(0, 20, Sort.by(Sort.Order.desc("createdAt"))));
  }

  @Test
  void shouldFindNewsGetDtoByIdWhenExists() {
    //given
    NewsGetDto newsGetDto = new NewsGetDto();

    //when
    when(newsRepo.findNewsGetDtoById(1L)).thenReturn(Optional.of(newsGetDto));
    NewsGetDto foundNewsGetDto = newsService.findNewsGetDtoById(1L);

    //then
    assertEquals(newsGetDto, foundNewsGetDto);
  }

  @Test
  void shouldThrowEntityNotFoundExeptionWhenNotExists() {
    //when
    when(newsRepo.findNewsGetDtoById(1L)).thenReturn(Optional.empty());

    //then
    assertThrows(EntityNotFoundException.class, () -> newsService.findNewsGetDtoById(1L));
  }

  @Test
  void shouldUpdateUpvotersWhenNewsFoundAndUserIsNotUpvoter() {
    //given
    Long newsId = 1L;
    User user = new User();
    user.setId(1L);
    News news = new News();
    news.setUpvoters(new ArrayList<>());

    //when
    when(newsRepo.findByIdWithUpvoters(newsId)).thenReturn(Optional.of(news));
    when(newsRepo.save(news)).thenReturn(news);
    int upvotersAmount = newsService.upvoteNews(newsId, user);

    //then
    assertEquals(1, upvotersAmount);
  }

  @Test
  void shouldDeleteUpvoterWhenNewsFoundAndUserIsUpvoter() {
    //given
    Long newsId = 1L;
    User user = new User();
    user.setId(1L);
    News news = new News();
    news.setUpvoters(Collections.singletonList(user));

    //when
    when(newsRepo.findByIdWithUpvoters(newsId)).thenReturn(Optional.of(news));
    when(newsRepo.save(news)).thenReturn(news);
    int upvotersAmount = newsService.upvoteNews(newsId, user);

    //then
    assertEquals(0, upvotersAmount);
  }

  @Test
  void shouldNotUpdateUpvotersWhenNewsNotFound() {
    //given
    Long newsId = 1L;
    User user = new User();
    user.setId(1L);
    News news = new News();
    news.setUpvoters(new ArrayList<>());

    //when
    when(newsRepo.findByIdWithUpvoters(newsId)).thenReturn(Optional.empty());
    when(newsRepo.save(news)).thenReturn(news);
    int upvotersAmount = newsService.upvoteNews(newsId, user);

    //then
    assertEquals(0, upvotersAmount);
  }

  @Test
  void shouldSaveNewsFromDto() {
    //given
    NewsPostDto newsPostDto = new NewsPostDto();
    Long userId = 1L;

    //when
    when(userService.findUserById(userId)).thenReturn(new User());
    when(tagService.filterTagsFromText(newsPostDto.getTags())).thenReturn(new ArrayList<>());
    newsService.save(newsPostDto, userId);

    //then
    verify(newsRepo, times(1)).save(any());
  }
}