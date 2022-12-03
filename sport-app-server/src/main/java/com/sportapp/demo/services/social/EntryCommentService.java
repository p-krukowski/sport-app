package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.EntryCommentGetDto;
import com.sportapp.demo.models.dtos.social.EntryCommentPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.EntryComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryCommentRepo;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EntryCommentService {

  private final EntryCommentRepo entryCommentRepo;
  private final EntryService entryService;
  private final ModelMapper modelMapper;

  @Transactional
  public EntryComment addCommentDto(Long entryId, EntryCommentPostDto commentDto, User user) {
    try {
      EntryComment comment = convertToEntity(commentDto);
      Entry entry = entryService.findEntryById(entryId);
      comment.setEntry(entry);
      comment.setAuthor(user);
      return entryCommentRepo.save(comment);
    } catch (EntityNotFoundException e) {
      throw new EntityNotFoundException("Entry not found");
    }
  }

  public List<EntryComment> findAllByEntryId(Long entryId) {
    return entryCommentRepo.findAllByEntryId(entryId);
  }

  public List<EntryCommentGetDto> findAllEntryCommentsDtosByEntryId(Long entryId) {
    return convertToDto(findAllByEntryId(entryId));
  }

  @Transactional
  public int upvoteEntry(Long commentId, User user) {
    EntryComment comment = entryCommentRepo.findById(commentId)
        .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
    return updateUpvoters(comment, user);
  }

  private int updateUpvoters(EntryComment comment, User user) {
    List<Long> upvoters = comment.getUpvoters().stream()
        .map(User::getId)
        .collect(Collectors.toList());
    if (upvoters.contains(user.getId())) {
      comment.setUpvoters(comment.getUpvoters().stream()
          .filter(upvoter -> !upvoter.getId().equals(user.getId()))
          .collect(Collectors.toList()));
    } else {
      comment.getUpvoters().add(user);
    }
    comment.setScore(comment.getUpvoters().size());
    return entryCommentRepo.save(comment).getUpvoters().size();
  }

  private EntryComment convertToEntity(EntryCommentPostDto entryCommentPostDto) {
    return modelMapper.map(entryCommentPostDto, EntryComment.class);
  }

  private List<EntryCommentGetDto> convertToDto(List<EntryComment> comments) {
    Type typeMap = new TypeToken<List<EntryCommentGetDto>>() {
    }.getType();
    return modelMapper.map(comments, typeMap);
  }
}
