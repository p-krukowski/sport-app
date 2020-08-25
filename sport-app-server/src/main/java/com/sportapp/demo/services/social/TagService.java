package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.repo.TagRepo;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TagService {

  TagRepo tagRepo;

  public TagService(TagRepo tagRepo) {
    this.tagRepo = tagRepo;
  }

  public List<Tag> saveAll(List<Tag> tags) {
    return tagRepo.saveAll(tags);
  }
}
