package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Long> {
}
