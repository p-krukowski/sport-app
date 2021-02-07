package com.sportapp.demo.services.mappers;

import com.sportapp.demo.models.dtos.social.CommentGetDto;
import com.sportapp.demo.models.dtos.social.CommentPostDto;
import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.User;

public class CommentMapper {

  public static Comment mapDtoToEntity(CommentPostDto commentPostDto, User user) {
    Comment comment = new Comment();
    comment.setAuthor(user);
    comment.setContent(commentPostDto.getContent());
    comment.setImageUrl(commentPostDto.getImageUrl());
    return comment;
  }

  public static CommentGetDto mapEntityToDto(Comment comment) {
    CommentGetDto commentGetDto = new CommentGetDto();
    commentGetDto.setAuthor(UserMapper.mapEntityToAuthorDto(comment.getAuthor()));
    commentGetDto.setScore(comment.getScore());
    commentGetDto.setId(comment.getId());
    commentGetDto.setContent(comment.getContent());
    commentGetDto.setCreatedAt(comment.getCreatedAt());
    commentGetDto.setImageUrl(comment.getImageUrl());
    return commentGetDto;
  }
}
