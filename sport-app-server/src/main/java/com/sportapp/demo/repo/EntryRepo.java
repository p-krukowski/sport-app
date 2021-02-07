package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Entry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepo extends CrudRepository<Entry, Long> {

  @Query("select distinct e from Entry e" +
      " left join fetch e.author")
  List<Entry> findAll(Pageable pageable);

  List<Entry> findAll();

  @Query("select e from Entry e")
  List<Entry> findBest(Pageable pageable);

  @Query("select e from Entry e"
      + " left join fetch e.upvoters"
      + " where e.id = ?1")
  Optional<Entry> findByIdWithUpvoters(Long entryId);

}