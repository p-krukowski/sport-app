package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.NewsComment;
import com.sportapp.demo.repo.NewsCommentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsCommentService {

  private final NewsCommentRepo newsCommentRepo;

  public NewsComment save(NewsComment newsComment) {
    return newsCommentRepo.save(newsComment);
  }
}
