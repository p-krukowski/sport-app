package com.sportapp.demo.services.social;

import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.repo.NewsRepo;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class NewsService {

    NewsRepo newsRepo;
    UserService userService;
    TagService tagService;

    @Autowired
    public NewsService(NewsRepo newsRepo, UserService userService, TagService tagService) {
        this.newsRepo = newsRepo;
        this.userService = userService;
        this.tagService = tagService;
    }

    public List<NewsGetDto> findAll(int page) {
        page = page < 1 ? 0 : page - 1;
        return newsRepo.findAllNews(PageRequest.of(page, 20, Sort.by(Sort.Order.desc("createdAt"))));
    }

    public void save(NewsPostDto newsPostDto, Long userId) {
        News news = setNews(newsPostDto, userId);
        newsRepo.save(news);
    }

    public List<NewsGetDto> findBest() {
        return newsRepo.findBest(PageRequest.of(
                0, 4, Sort.by(Sort.Direction.DESC, "score", "createdAt")));
    }

    public NewsGetDto findNewsGetDtoById(Long id) {
        Optional<NewsGetDto> newsGetDtoOptional = newsRepo.findNewsGetDtoById(id);
        if (newsGetDtoOptional.isPresent()) {
            return newsGetDtoOptional.get();
        } else {
            throw new EntityNotFoundException("There is no entity with this id");
        }
    }

    private News setNews(NewsPostDto newsPostDto, Long userId) {
        News news = new News();
        news.setAuthor(userService.findUserById(userId));
        news.setTitle(newsPostDto.getTitle());
        news.setImageUrl(newsPostDto.getImageURL());
        news.setValue(newsPostDto.getDescription());
        news.setLink(newsPostDto.getLink());
        news.setTags(tagService.filterTagsFromText(newsPostDto.getTags()));
        return news;
    }
}
