package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.CommentRepo;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  CommentRepo commentRepo;
  EntryService entryService;
  NewsService newsService;

  public CommentService(CommentRepo commentRepo, EntryService entryService, NewsService newsService) {
    this.commentRepo = commentRepo;
    this.entryService = entryService;
    this.newsService = newsService;
  }

  @Transactional
  public ResponseEntity<?> upvoteComment(Long commentId, User user) {
    Comment comment = commentRepo.findById(commentId)
        .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
    return new ResponseEntity<>(updateUpvoters(comment, user), HttpStatus.OK);
  }

  private Integer updateUpvoters(Comment comment, User user) {
    PostService.updateUpvoters(comment, user);
    return commentRepo.save(comment).getUpvoters().size();
  }

}
