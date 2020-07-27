package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.EventSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventSoccerRepo extends JpaRepository<EventSoccer, Long> {

    List<EventSoccer> findAllByDate(String date);
}
