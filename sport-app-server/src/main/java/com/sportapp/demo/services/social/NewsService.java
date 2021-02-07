package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.NewsRepo;
import com.sportapp.demo.services.mappers.CommentMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NewsService {

  NewsRepo newsRepo;
  UserService userService;
  TagService tagService;
  ModelMapper modelMapper;

  public NewsService(NewsRepo newsRepo, UserService userService, TagService tagService,
      ModelMapper modelMapper) {
    this.newsRepo = newsRepo;
    this.userService = userService;
    this.tagService = tagService;
    this.modelMapper = modelMapper;
  }

  public List<NewsGetDto> findAll(int page) {
    page = page < 1 ? 0 : page - 1;
    return newsRepo.findAllNews(PageRequest.of(page, 20, Sort.by(Sort.Order.desc("createdAt"))));
  }

  @Transactional
  public void save(NewsPostDto newsPostDto, Long userId) {
    News news = setNews(newsPostDto, userId);
    newsRepo.save(news);
  }

  public List<NewsGetDto> findBest() {
    return newsRepo.findBest(PageRequest.of(
        0, 4, Sort.by(Sort.Direction.DESC, "score", "createdAt")));
  }

  public NewsGetDto findNewsGetDtoById(Long id) {
    Optional<NewsGetDto> newsGetDtoOptional = newsRepo.findNewsGetDtoById(id);
    if (newsGetDtoOptional.isPresent()) {
      return newsGetDtoOptional.get();
    } else {
      throw new EntityNotFoundException("There is no entity with this id");
    }
  }

  public News findById(Long id) {
    Optional<News> newsOptional = newsRepo.findById(id);
    return newsRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Entity with this id not found"));
  }

  @Transactional
  public int upvoteNews(Long newsId, User user) {
    Optional<News> newsOptional = newsRepo.findByIdWithUpvoters(newsId);
    return newsOptional.map(news -> updateUpvoters(news, user)).orElse(0);
  }

  @Transactional
  public ResponseEntity<?> addComment(Long newsId, CommentPostDto commentPostDto,
      User currentUser) {
    try {
      findById(newsId).getComments()
          .add(CommentMapper.mapDtoToEntity(commentPostDto, currentUser));
      return new ResponseEntity<>(HttpStatus.CREATED);
    } catch (EntityNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  public List<CommentGetDto> findAllComments(Long newsId) {
    try {
      return findById(newsId).getComments().stream()
          .map(CommentMapper::mapEntityToDto)
          .collect(Collectors.toList());
    } catch (EntityNotFoundException e) {
      return new ArrayList<>();
    }
  }

  private int updateUpvoters(News news, User user) {
    PostService.updateUpvoters(news, user);
    return newsRepo.save(news).getUpvoters().size();
  }

  private News setNews(NewsPostDto newsPostDto, Long userId) {
    News news = new News();
    news.setAuthor(userService.findUserById(userId));
    news.setTitle(newsPostDto.getTitle());
    news.setDescription(newsPostDto.getDescription());
    news.setImageUrl(newsPostDto.getImageURL());
    news.setContent(newsPostDto.getContent());
    news.setLink(newsPostDto.getUrl());
    news.setTags(tagService.filterTagsFromText(newsPostDto.getTags()));
    return news;
  }
}
