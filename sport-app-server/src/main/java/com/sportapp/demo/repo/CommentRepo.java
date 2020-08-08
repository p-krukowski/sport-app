package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends CrudRepository<Comment, Long> {

    @Query("select c from Comment c " +
            " left join fetch c.author" +
            " left join fetch c.entry" +
            " where c.entry.id = ?1")
    List<Comment> findAllByEntryId(Long entryId);
}
