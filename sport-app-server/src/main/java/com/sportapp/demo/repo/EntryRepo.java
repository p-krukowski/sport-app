package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepo extends CrudRepository<Entry, Long> {
    List<Entry> findAll(Sort sort);
    List<Entry> findAll();

    Entry findByIdAndLikers(Long Id, User user);
}
