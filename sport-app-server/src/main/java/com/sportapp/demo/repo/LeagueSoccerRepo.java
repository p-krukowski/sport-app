package com.sportapp.demo.repo;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueSoccerRepo extends JpaRepository<LeagueSoccer, Long> {

    List<LeagueSoccer> findAll();

    List<LeagueSoccer> findAllByDiscipline(String discipline);

    List<LeagueSoccer> findAllById(Iterable<Long> id);
}
