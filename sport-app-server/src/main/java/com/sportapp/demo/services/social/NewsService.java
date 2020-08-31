package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.NewsCommentGetDto;
import com.sportapp.demo.models.dtos.social.NewsCommentPostDto;
import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.models.social.NewsComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.NewsRepo;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class NewsService {

  NewsRepo newsRepo;
  UserService userService;
  TagService tagService;
  NewsCommentService newsCommentService;
  ModelMapper modelMapper;

  @Autowired
  public NewsService(NewsRepo newsRepo, UserService userService, TagService tagService,
      NewsCommentService newsCommentService, ModelMapper modelMapper) {
    this.newsRepo = newsRepo;
    this.userService = userService;
    this.tagService = tagService;
    this.newsCommentService = newsCommentService;
    this.modelMapper = modelMapper;
  }

  public List<NewsGetDto> findAll(int page) {
    page = page < 1 ? 0 : page - 1;
    return newsRepo.findAllNews(PageRequest.of(page, 20, Sort.by(Sort.Order.desc("createdAt"))));
  }

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

  public List<NewsCommentGetDto> findNewsCommentsByNewsId(Long id) {
    return mapEntityToDto(newsRepo.findNewsCommentsById(id));
  }

  public void saveNewsComment(Long newsId, NewsCommentPostDto newsCommentPostDto, Long userId) {
    User user = userService.findUserById(userId);
    NewsComment newsComment = new NewsComment();
    newsComment.setValue(newsCommentPostDto.getValue());
    newsComment.setAuthor(user);
    newsCommentService.save(newsComment);
    Optional<News> newsOptional = newsRepo.findById(newsId);
    if (newsOptional.isPresent()) {
      News news = newsOptional.get();
      List<NewsComment> newsComments = news.getNewsComments();
      newsComments.add(newsComment);
      news.setNewsComments(newsComments);
      newsRepo.save(news);
    }
  }

  public int upvoteNews(Long newsId, Long userId) {
    Optional<News> newsOptional = newsRepo.findByIdWithLikers(newsId);
    User user = userService.findUserById(userId);
    if (newsOptional.isPresent()) {
      return updateUpvoters(newsOptional, user);
    } else {
      return 0;
    }
  }

  private int updateUpvoters(Optional<News> newsOptional, User user) {
    News news = newsOptional.get();
    List<User> likers = news.getLikers();
    if (likers.contains(user)) {
      likers.remove(user);
    } else {
      likers.add(user);
    }
    news.setScore(likers);
    newsRepo.save(news);
    return news.getLikers().size();
  }

  private List<NewsCommentGetDto> mapEntityToDto(List<NewsComment> newsComments) {
    Type typeMap = new TypeToken<List<NewsCommentGetDto>>() {}.getType();
    return modelMapper.map(newsComments, typeMap);
  }

  private News setNews(NewsPostDto newsPostDto, Long userId) {
    News news = new News();
    news.setAuthor(userService.findUserById(userId));
    news.setTitle(newsPostDto.getTitle());
    news.setImageUrl(newsPostDto.getImageURL());
    news.setValue(newsPostDto.getDescription());
    news.setLink(newsPostDto.getLink());
    news.setTags(tagService.filterTagsFromText(newsPostDto.getTags()));
    return news;
  }
}
