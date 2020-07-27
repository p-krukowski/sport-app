package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends CrudRepository<Comment, Long> {

    List<Comment> findAllByEntryId(Long entryId);
}
