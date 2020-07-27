package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.CommentService;
import com.sportapp.demo.services.social.EntryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/entry")
public class CommentController {

    CommentService commentService;
    ModelMapper modelMapper;
    EntryService entryService;

    @Autowired
    public CommentController(CommentService commentService, ModelMapper modelMapper, EntryService entryService) {
        this.commentService = commentService;
        this.modelMapper = modelMapper;
        this.entryService = entryService;
    }

    @PostMapping("/{entryId}/comments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addComment(@PathVariable Long entryId, @Valid @RequestBody CommentPostDto commentPostDto, @CurrentUser UserPrincipal currentUser) {
        Comment comment = convertToEntity(commentPostDto);
        comment.setEntry(entryService.findEntryById(entryId));
        commentService.addComment(comment, currentUser.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Comment convertToEntity(CommentPostDto commentPostDto) {
        return modelMapper.map(commentPostDto, Comment.class);
    }

    @GetMapping("/{entryId}/comments")
    @ResponseBody
    public List<CommentGetDto> fetchAllComments(@PathVariable Long entryId) {
        List<Comment> comments = commentService.findCommentsByEntryId(entryId);
        return convertToDto(comments);
    }

    private List<CommentGetDto> convertToDto(List<Comment> comments) {
        Type typeMap = new TypeToken<List<CommentGetDto>>() {}.getType();
        return modelMapper.map(comments, typeMap);
    }
}
