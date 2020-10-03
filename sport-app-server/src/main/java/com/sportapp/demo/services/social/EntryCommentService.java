package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.EntryComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryCommentRepo;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EntryCommentService {

  EntryCommentRepo entryCommentRepo;
  EntryService entryService;

  public EntryCommentService(EntryCommentRepo entryCommentRepo,
      EntryService entryService) {
    this.entryCommentRepo = entryCommentRepo;
    this.entryService = entryService;
  }

  public void addComment(Long entryId, EntryComment comment, User user) {
    Entry entry = entryService.findEntryById(entryId);
    comment.setEntry(entry);
    comment.setAuthor(user);
    entryCommentRepo.save(comment);
  }

  public List<EntryComment> findAllByEntryId(Long entryId) {
    return entryCommentRepo.findAllByEntryId(entryId);
  }

  @Transactional
  public int upvoteEntry(Long commentId, User user) {
    Optional<EntryComment> commentOpt = entryCommentRepo.findById(commentId);
    return commentOpt.map(comment -> updateUpvoters(comment, user)).orElse(0);
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
}
