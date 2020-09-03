package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.CommentService;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entry")
public class CommentController {

  CommentService commentService;
  ModelMapper modelMapper;

  @Autowired
  public CommentController(CommentService commentService, ModelMapper modelMapper) {
    this.commentService = commentService;
    this.modelMapper = modelMapper;
  }

  @PostMapping("/{entryId}/comments")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<HttpStatus> addComment(@PathVariable Long entryId,
      @Valid @RequestBody CommentPostDto commentPostDto, @CurrentUser User currentUser) {
    Comment comment = convertToEntity(commentPostDto);
    commentService.addComment(entryId, comment, currentUser);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/{entryId}/comments")
  @ResponseBody
  public List<CommentGetDto> fetchAllComments(@PathVariable Long entryId) {
    List<Comment> comments = commentService.findCommentsByEntryId(entryId);
    return convertToDto(comments);
  }

  private List<CommentGetDto> convertToDto(List<Comment> comments) {
    Type typeMap = new TypeToken<List<CommentGetDto>>() {
    }.getType();
    return modelMapper.map(comments, typeMap);
  }

  private Comment convertToEntity(CommentPostDto commentPostDto) {
    return modelMapper.map(commentPostDto, Comment.class);
  }
}
