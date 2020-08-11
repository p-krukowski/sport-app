package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.NewsGetDto;
import com.sportapp.demo.models.dtos.social.NewsPostDto;
import com.sportapp.demo.models.social.News;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.NewsService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    NewsService newsService;
    ModelMapper modelMapper;

    @Autowired
    public NewsController(NewsService newsService, ModelMapper modelMapper) {
        this.newsService = newsService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all/{page}")
    public List<NewsGetDto> fetchAllNews(@PathVariable int page) {
        return convertListToDto(newsService.findAll(page));
    }

    @GetMapping("/best")
    public List<NewsGetDto> fetchBestNews() {
        return newsService.findBest();
    }

    @PostMapping("/new")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<HttpStatus> addNews(@RequestBody NewsPostDto newsPostDto,
                                              @CurrentUser UserPrincipal currentUser) {
        newsService.save(newsPostDto, currentUser.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private List<NewsGetDto> convertListToDto(List<News> news) {
        Type typeMap = new TypeToken<List<NewsGetDto>>() {}.getType();
        return modelMapper.map(news, typeMap);
    }
}
