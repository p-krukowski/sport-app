package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.EntryComment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryCommentRepo;
import java.util.List;
import org.springframework.stereotype.Service;

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
}
