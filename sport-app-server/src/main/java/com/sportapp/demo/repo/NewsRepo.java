package com.sportapp.demo.repo;

import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.social.News;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepo extends JpaRepository<News, Long> {

  @Query("select new com.sportapp.demo.models.dtos.social" +
      ".NewsGetDto(n.id, n.description, n.content, n.score, n.title, n.imageUrl, n.link, n.createdAt, n.author.username) from News n")
  List<NewsGetDto> findAllNews(Pageable page);

  @Query("select new com.sportapp.demo.models.dtos.social" +
      ".NewsGetDto(n.id, n.description, n.content, n.score, n.title, n.imageUrl, n.link, n.createdAt, n.author.username) from News n")
  List<NewsGetDto> findBest(Pageable pageable);

  @Query("select new com.sportapp.demo.models.dtos.social" +
      ".NewsGetDto(n.id, n.description, n.content, n.score, n.title, n.imageUrl, n.link, n.createdAt, n.author.username) from News n"
      + " where n.id = ?1")
  Optional<NewsGetDto> findNewsGetDtoById(Long id);

  @Query("select n from News n"
      + " left join fetch n.upvoters"
      + " where n.id = ?1")
  Optional<News> findByIdWithUpvoters(Long id);
}