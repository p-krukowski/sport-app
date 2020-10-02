package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.EntryComment;
import java.util.List;
import java.util.Optional;
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

  @Query("select e from Entry e")
  List<Entry> findBest(Pageable pageable);

  @Query("select e.comments from Entry e"
      + " where e.id = ?1")
  List<EntryComment> findCommentsByEntryId(Long entryId);

  @Query("select e from Entry e"
      + " left join fetch e.upvoters"
      + " where e.id = ?1")
  Optional<Entry> findByIdWithUpvoters(Long entryId);

  @Query("select e from Entry e"
      + " left join fetch e.comments"
      + " where e.id = ?1")
  Entry findEntryByIdWithComments(Long entryId);
}