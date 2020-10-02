package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.services.social.EntryService;
import java.util.List;
import org.springframework.http.HttpStatus;
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

  public EntryController(EntryService entryService) {
    this.entryService = entryService;
  }

  @GetMapping("/all/{page}")
  public List<EntryGetDto> fetchEntries(@PathVariable int page) {
    return entryService.fetchAllEntriesDtoSorted(page);
  }

  @PostMapping("/new")
  @PreAuthorize("isAuthenticated()")
  public HttpStatus addEntry(@RequestBody EntryPostDto entryPostDto,
      @CurrentUser User currentUser) {
    entryService.addEntry(entryPostDto, currentUser.getId());
    return HttpStatus.CREATED;
  }

  @PostMapping("/{entryId}/upvote")
  @PreAuthorize("isAuthenticated()")
  public int upvoteEntry(@PathVariable Long entryId,
      @CurrentUser User currentUser) {
    return entryService.upvoteEntry(entryId, currentUser);
  }

  @GetMapping("/best")
  public List<EntryGetDto> fetchBestEntries() {
    return entryService.findBestEntriesDto();
  }
}
