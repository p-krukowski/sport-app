package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private EntryService entryService;

    @Autowired
    public CommentService(EntryService entryService) {
        this.entryService = entryService;
    }

    public CommentService() {
    }

    public void addComment(Long entryId, Comment comment, User user) {
        Entry entry = entryService.findEntryByIdWithComments(entryId);
        List<Comment> entryComments = entry.getComments();
        comment.setAuthor(user);
        entryComments.add(comment);
        entry.setComments(entryComments);
        entryService.save(entry);
    }

    public List<Comment> findCommentsByEntryId(Long entryId) {
        return entryService.findCommentsByEntryId(entryId);
    }
}
