package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.social.Comment;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepo extends CrudRepository<Entry, Long> {

  @Query("select distinct e from Entry e" +
      " left join fetch e.comments" +
      " left join fetch e.author")
  List<Entry> findAll(Pageable pageable);

  List<Entry> findAll();

  Entry findByIdAndLikers(Long id, User user);

  @Query("select new com.sportapp.demo.models.dtos.social." +
      "EntryGetDto(e.id, e.value, e.score, e.createdAt) from Entry e")
  List<EntryGetDto> findBest(Pageable pageable);

  @Query("select e.comments from Entry e"
      + " where e.id = ?1")
  List<Comment> findCommentsByEntryId(Long entryId);
}