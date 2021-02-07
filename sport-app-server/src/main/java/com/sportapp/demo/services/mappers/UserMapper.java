package com.sportapp.demo.services.mappers;

import com.sportapp.demo.models.dtos.social.AuthorDto;
import com.sportapp.demo.models.social.User;

public class UserMapper {

  public static AuthorDto mapEntityToAuthorDto(User user) {
    AuthorDto authorDto = new AuthorDto();
    authorDto.setUsername(user.getUsername());
    return authorDto;
  }
}
