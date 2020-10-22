package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.EntryCommentGetDto;
import com.sportapp.demo.models.dtos.social.EntryCommentPostDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.EntryCommentService;
import com.sportapp.demo.services.social.EntryService;
import java.util.List;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entry")
public class EntryCommentController {

  EntryCommentService entryCommentService;
  EntryService entryService;
  ModelMapper modelMapper;

  public EntryCommentController(EntryCommentService entryCommentService, ModelMapper modelMapper,
      EntryService entryService) {
    this.entryCommentService = entryCommentService;
    this.modelMapper = modelMapper;
    this.entryService = entryService;
  }

  @PostMapping("/{entryId}/comments/new")
  @PreAuthorize("isAuthenticated()")
  public HttpStatus addComment(@PathVariable Long entryId,
      @Valid @RequestBody EntryCommentPostDto commentDto, @CurrentUser User currentUser) {
    entryCommentService.addCommentDto(entryId, commentDto, currentUser);
    return HttpStatus.CREATED;
  }

  @GetMapping("/{entryId}/comments")
  public List<EntryCommentGetDto> fetchAllComments(@PathVariable Long entryId) {
    return entryCommentService.findAllEntryCommentsDtosByEntryId(entryId);
  }

  @PatchMapping("/{commentId}/upvote")
  @PreAuthorize("isAuthenticated()")
  public int upvoteComment(@PathVariable Long commentId,
      @CurrentUser User currentUser) {
    return entryCommentService.upvoteEntry(commentId, currentUser);
  }
}
