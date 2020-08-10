package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueSoccerRepo extends JpaRepository<LeagueSoccer, Long> {

    List<LeagueSoccer> findAllByDiscipline(String discipline);

    List<LeagueSoccer> findAllById(Iterable<Long> id);

    @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
            ".LeagueSoccerGetDto(l.id, l.discipline, l.name, l.nameAlternate) from LeagueSoccer l")
    List<LeagueSoccerGetDto> findAllGetDtoById();

    @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
            ".LeagueSoccerGetDto(l.id, l.discipline, l.name, l.nameAlternate) from LeagueSoccer l" +
            " where l.id = ?1")
    LeagueSoccerGetDto findGetDtoById(Long id);
}
