package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.repo.NewsRepo;
import com.sportapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    NewsRepo newsRepo;
    UserService userService;

    @Autowired
    public NewsService(NewsRepo newsRepo, UserService userService) {
        this.newsRepo = newsRepo;
        this.userService = userService;
    }

    public List<News> findAll() {
        return newsRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public void save(NewsPostDto newsPostDto, Long userId) {
        News news = setNews(newsPostDto, userId);
        newsRepo.save(news);
    }

    private News setNews(NewsPostDto newsPostDto, Long userId) {
        News news = new News();
        news.setAuthor(userService.findUserById(userId));
        news.setTitle(newsPostDto.getTitle());
        news.setImageUrl(newsPostDto.getImageURL());
        news.setValue(newsPostDto.getDescription());
        news.setLink(newsPostDto.getLink());
        return news;
    }
}
