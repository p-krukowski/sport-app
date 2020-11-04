package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.repo.TagRepo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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

  public List<Tag> findAll() {
    return tagRepo.findAll();
  }

  public Optional<Tag> findTagByName(String tagName) {
    return tagRepo.findTagByName(tagName);
  }

  public List<Tag> filterTagsFromText(String text) {
    List<Tag> tags = new ArrayList<>();
    if (text != null && !text.isBlank()) {
      String[] strings = text.split(" ");
      List<String> tagsNames = getTagsNames(strings);
      createTags(tags, tagsNames);
    }
    return tags;
  }

  private void createTags(List<Tag> tags, List<String> tagsNames) {
    tagsNames.forEach(tagName -> {
      Optional<Tag> tagOptional = findTagByName(tagName);
      Tag tag = new Tag();
      if (tagOptional.isEmpty()) {
        tag.setName(tagName);
      } else {
        tag = tagOptional.get();
      }
      tags.add(tag);
    });
  }

  private List<String> getTagsNames(String[] strings) {
    return Arrays.stream(strings)
        .filter(s -> s.matches("#[\\w]{3,}"))
        .map(s -> s.substring(1).toLowerCase())
        .distinct()
        .collect(Collectors.toList());
  }

  //TODO: better filtering tags (tags including comas, bottomLines etc.)
}
