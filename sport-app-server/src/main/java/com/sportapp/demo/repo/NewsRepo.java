package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.News;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepo extends JpaRepository<News, Long> {

    @Query("select n from News n" +
            " left join fetch n.author")
    List<News> findAllNews(Pageable page);
}
