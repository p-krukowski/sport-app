package com.sportapp.demo.services.mappers;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.social.Entry;

public class EntryMapper {

  public static EntryGetDto mapEntityToDto(Entry entry) {
    EntryGetDto entryGetDto = new EntryGetDto();
    entryGetDto.setAuthor(UserMapper.mapEntityToAuthorDto(entry.getAuthor()));
    entryGetDto.setContent(entry.getContent());
    entryGetDto.setScore(entry.getScore());
    entryGetDto.setCommentsAmount(entry.getComments().size());
    entryGetDto.setImageUrl(entry.getImageUrl());
    entryGetDto.setId(entry.getId());
    entryGetDto.setCreatedAt(entry.getCreatedAt());
    return entryGetDto;
  }
}
