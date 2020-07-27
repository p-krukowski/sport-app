package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private CommentRepo commentRepo;
    private UserService userService;

    @Autowired
    public CommentService(CommentRepo commentRepo, UserService userService) {
        this.commentRepo = commentRepo;
        this.userService = userService;
    }

    public CommentService() {
    }

    public void addComment(Comment comment, Long userId) {
        User user = userService.findUserById(userId);
        comment.setAuthor(user);
        commentRepo.save(comment);
    }

    public List<Comment> findCommentsByEntryId(Long entryId) {
        return commentRepo.findAllByEntryId(entryId);
    }
}
