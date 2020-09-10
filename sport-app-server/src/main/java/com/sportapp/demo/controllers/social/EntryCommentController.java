package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.EntryCommentGetDto;
import com.sportapp.demo.models.dtos.social.EntryCommentPostDto;
import com.sportapp.demo.models.social.EntryComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.EntryCommentService;
import com.sportapp.demo.services.social.EntryService;
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
public class EntryCommentController {

  EntryCommentService entryCommentService;
  EntryService entryService;
  ModelMapper modelMapper;

  @Autowired
  public EntryCommentController(EntryCommentService entryCommentService, ModelMapper modelMapper,
      EntryService entryService) {
    this.entryCommentService = entryCommentService;
    this.modelMapper = modelMapper;
    this.entryService = entryService;
  }

  @PostMapping("/{entryId}/comments")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<HttpStatus> addComment(@PathVariable Long entryId,
      @Valid @RequestBody EntryCommentPostDto entryCommentPostDto, @CurrentUser User currentUser) {
    EntryComment comment = convertToEntity(entryCommentPostDto);
    entryCommentService.addComment(entryId, comment, currentUser);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/{entryId}/comments")
  @ResponseBody
  public List<EntryCommentGetDto> fetchAllComments(@PathVariable Long entryId) {
    List<EntryComment> comments = entryCommentService.findAllByEntryId(entryId);
    return convertToDto(comments);
  }

  private List<EntryCommentGetDto> convertToDto(List<EntryComment> comments) {
    Type typeMap = new TypeToken<List<EntryCommentGetDto>>() {
    }.getType();
    return modelMapper.map(comments, typeMap);
  }

  private EntryComment convertToEntity(EntryCommentPostDto entryCommentPostDto) {
    return modelMapper.map(entryCommentPostDto, EntryComment.class);
  }
}
