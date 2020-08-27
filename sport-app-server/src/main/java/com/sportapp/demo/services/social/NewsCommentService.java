package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.NewsComment;
import com.sportapp.demo.repo.NewsCommentRepo;
import org.springframework.stereotype.Service;

@Service
public class NewsCommentService {

  private NewsCommentRepo newsCommentRepo;

  public NewsCommentService(NewsCommentRepo newsCommentRepo) {
    this.newsCommentRepo = newsCommentRepo;
  }

  public NewsComment save(NewsComment newsComment) {
    return newsCommentRepo.save(newsComment);
  }
}
