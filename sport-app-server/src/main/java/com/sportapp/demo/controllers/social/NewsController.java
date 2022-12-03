package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.NewsCommentGetDto;
import com.sportapp.demo.models.dtos.social.NewsCommentPostDto;
import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.NewsService;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
class NewsController {

  private final NewsService newsService;

  @GetMapping("/all/{page}")
  List<NewsGetDto> fetchAllNews(@PathVariable int page) {
    return newsService.findAll(page);
  }

  @GetMapping("/{id}")
  NewsGetDto fetchNewsById(@PathVariable Long id) {
    try {
      return newsService.findNewsGetDtoById(id);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No news with such id");
    }
  }

  @GetMapping("/best")
  List<NewsGetDto> fetchBestNews() {
    return newsService.findBest();
  }

  @GetMapping("/{id}/comments")
  List<NewsCommentGetDto> fetchNewsCommentsByNewsId(@PathVariable Long id) {
    return newsService.findNewsCommentsByNewsId(id);
  }

  @PostMapping("/new")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<HttpStatus> addNews(@RequestBody NewsPostDto newsPostDto, @CurrentUser User currentUser) {
    newsService.save(newsPostDto, currentUser.getId());
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/{id}/comments/new")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<HttpStatus> addNewsComment(@PathVariable Long id, @RequestBody NewsCommentPostDto newsCommentPostDto,
                                            @CurrentUser User currentUser) {
    newsService.saveNewsComment(id, newsCommentPostDto, currentUser);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/{id}/upvote")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<Integer> upvoteNews(@PathVariable Long id, @CurrentUser User currentUser) {
    int score = newsService.upvoteNews(id, currentUser);
    return new ResponseEntity<>(score, HttpStatus.OK);
  }
}
