package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.CommentService;
import com.sportapp.demo.services.social.NewsService;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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
public class NewsController {

  NewsService newsService;
  CommentService commentService;

  @Autowired
  public NewsController(NewsService newsService, CommentService commentService) {
    this.newsService = newsService;
    this.commentService = commentService;
  }

  @GetMapping("/all/{page}")
  public List<NewsGetDto> fetchAllNews(@PathVariable int page) {
    return newsService.findAll(page);
  }

  @GetMapping("/{id}")
  public NewsGetDto fetchNewsById(@PathVariable Long id) {
    try {
      return newsService.findNewsGetDtoById(id);
    } catch (EntityNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No news with such id");
    }
  }

  @GetMapping("/best")
  public List<NewsGetDto> fetchBestNews() {
    return newsService.findBest();
  }

  @GetMapping("/{newsId}/comments")
  public List<CommentGetDto> fetchCommentsByNewsId(@PathVariable Long newsId) {
    return newsService.findAllComments(newsId);
  }

  @PostMapping("/new")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<HttpStatus> addNews(@RequestBody NewsPostDto newsPostDto,
      @CurrentUser User currentUser) {
    newsService.save(newsPostDto, currentUser.getId());
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/{id}/comments/new")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> addComment(@PathVariable Long id,
      @RequestBody CommentPostDto commentPostDto, @CurrentUser User currentUser) {
    return newsService.addComment(id, commentPostDto, currentUser);
  }

  @PostMapping("/{id}/upvote")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Integer> upvoteNews(@PathVariable Long id, @CurrentUser User currentUser) {
    int score = newsService.upvoteNews(id, currentUser);
    return new ResponseEntity<>(score, HttpStatus.OK);
  }
}
