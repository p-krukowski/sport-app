package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.sportdata.soccer.get.LeagueSoccerGetDto;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueSoccerRepo extends JpaRepository<LeagueSoccer, Long> {

  List<LeagueSoccer> findAllByDiscipline(String discipline);

  List<LeagueSoccer> findAllByIdIn(List<Long> id);

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".LeagueSoccerGetDto(l.id, l.discipline, l.name, l.nameAlternate) from LeagueSoccer l")
  List<LeagueSoccerGetDto> findAllGetDtoById();

  @Query("select new com.sportapp.demo.models.dtos.sportdata.soccer.get" +
      ".LeagueSoccerGetDto(l.id, l.discipline, l.name, l.nameAlternate) from LeagueSoccer l" +
      " where l.id = ?1")
  LeagueSoccerGetDto findGetDtoById(Long id);

  @Query("select distinct l.discipline from LeagueSoccer l")
  List<String> findAllDisciplines();

  @Query("select l.id from LeagueSoccer l")
  List<Long> findAllIds();
}
