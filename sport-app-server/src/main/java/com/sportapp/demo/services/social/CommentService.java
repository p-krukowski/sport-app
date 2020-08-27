package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.CommentRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private CommentRepo commentRepo;
    private UserService userService;
    private EntryService entryService;

    @Autowired
    public CommentService(CommentRepo commentRepo, UserService userService,
        EntryService entryService) {
        this.commentRepo = commentRepo;
        this.userService = userService;
        this.entryService = entryService;
    }

    public CommentService() {
    }

    public void addComment(Long entryId, Comment comment, Long userId) {
        User user = userService.findUserById(userId);
        comment.setAuthor(user);
        commentRepo.save(comment);
        Entry entry = entryService.findEntryById(entryId);
        List<Comment> entryComments = entry.getComments();
        entryComments.add(comment);
        entry.setComments(entryComments);
        entryService.save(entry);
    }

    public List<Comment> findCommentsByEntryId(Long entryId) {
        return entryService.findCommentsByEntryId(entryId);
    }
}
