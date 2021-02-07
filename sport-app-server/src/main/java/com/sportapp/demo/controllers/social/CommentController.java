package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
public class CommentController {

  CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PatchMapping("/{commentId}/upvote")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> upvoteComment(@PathVariable Long commentId, @CurrentUser User currentUser) {
    return commentService.upvoteComment(commentId, currentUser);
  }
}
