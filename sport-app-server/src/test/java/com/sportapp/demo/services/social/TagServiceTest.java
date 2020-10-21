package com.sportapp.demo.services.social;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.social.Tag;
import com.sportapp.demo.repo.TagRepo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class TagServiceTest {

  @Mock
  TagRepo tagRepo;
  @InjectMocks
  TagService tagService;

  @BeforeEach
  void init() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  void shouldFilterTagsFromTextWhenProperTags() {
    //given
    String text = "#firstTag #secondTag #thirdTag";
    Tag tag1 = new Tag();
    tag1.setName("firsttag");
    Tag tag2 = new Tag();
    tag2.setName("secondtag");
    Tag tag3 = new Tag();
    tag3.setName("thirdtag");
    List<Tag> tags = new ArrayList<>();
    tags.add(tag1);
    tags.add(tag2);
    tags.add(tag3);
    List<String> tagsStrings = tags.stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //when
    List<String> filteredTags = tagService.filterTagsFromText(text)
        .stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //given
    assertEquals(tagsStrings, filteredTags);
  }

  @Test
  void shouldFilterTagsFromTextWhenInproperTags() {
    //given
    String text = "#firstTag,#secondTag #thirdTag";
    Tag tag3 = new Tag();
    tag3.setName("thirdtag");
    List<Tag> tags = new ArrayList<>();
    tags.add(tag3);
    List<String> tagsStrings = tags.stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //when
    List<String> filteredTags = tagService.filterTagsFromText(text)
        .stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //given
    assertEquals(tagsStrings, filteredTags);
  }

  @Test
  void shouldFilterTagsFromTextWhenTagExists() {
    //given
    String text = "#firstTag,#secondTag #thirdTag";
    Tag tag3 = new Tag();
    tag3.setName("thirdtag");
    List<Tag> tags = new ArrayList<>();
    tags.add(tag3);
    List<String> tagsStrings = tags.stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //when
    when(tagRepo.findTagByName("thirdtag")).thenReturn(Optional.of(tag3));
    List<String> filteredTags = tagService.filterTagsFromText(text)
        .stream()
        .map(Tag::getName)
        .collect(Collectors.toList());

    //given
    assertEquals(tagsStrings, filteredTags);
  }

}