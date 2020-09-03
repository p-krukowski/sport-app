package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.EntryService;
import java.lang.reflect.Type;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entries")
public class EntryController {

  private final EntryService entryService;
  private final ModelMapper modelMapper;

  @Autowired
  public EntryController(EntryService entryService, ModelMapper modelMapper) {
    this.entryService = entryService;
    this.modelMapper = modelMapper;
  }

  @GetMapping("/all/{page}")
  public List<EntryGetDto> fetchEntries(@PathVariable int page) {
    List<Entry> entries = entryService.fetchAllEntriesSorted(page);
    return convertToDto(entries);
  }

  @PostMapping("/new")
  @PreAuthorize("isAuthenticated()")
  public HttpStatus addEntry(@RequestBody EntryPostDto entryPostDto,
      @CurrentUser User currentUser) {
    entryService.addEntry(entryPostDto, currentUser.getId());
    return HttpStatus.OK;
  }

  @PostMapping("/{entryId}/like")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Integer> upvoteEntry(@PathVariable Long entryId,
      @CurrentUser User currentUser) {
    int score = entryService.upvoteEntry(entryId, currentUser);
    return new ResponseEntity<>(score, HttpStatus.OK);
  }

  @GetMapping("/best")
  public List<EntryGetDto> fetchBestEntries() {
    return entryService.findBest();
  }

  private List<EntryGetDto> convertToDto(List<Entry> entries) {
    Type typeMap = new TypeToken<List<EntryGetDto>>() {
    }.getType();
    List<EntryGetDto> entriesDto = modelMapper.map(entries, typeMap);
    for (int i = 0; i < entries.size(); i++) {
      entriesDto.get(i).setCommentsAmount(
          entries.get(i).getComments().size()
      );
    }
    return entriesDto;
  }
}
