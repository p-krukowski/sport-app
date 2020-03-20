package com.sportapp.demo.repo;

import com.sportapp.demo.models.Entry;
import com.sportapp.demo.models.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepo extends CrudRepository<Entry, Long> {
    public List<Entry> findAll(Sort sort);
    public List<Entry> findAll();

    public Entry findByIdAndLikers(Long Id, User user);
}
