package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.NewsComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsCommentRepo extends JpaRepository<NewsComment, Long> {

}
