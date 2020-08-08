package com.sportapp.demo.controllers.social;

import com.sportapp.demo.models.dtos.social.EntryGetDto;
import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.social.EntryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

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

    private List<EntryGetDto> convertToDto(List<Entry> entries) {
        Type typeMap = new TypeToken<List<EntryGetDto>>() {}.getType();
        List<EntryGetDto> entriesDto = modelMapper.map(entries, typeMap);
        for (int i = 0; i < entries.size(); i++) {
            entriesDto.get(i).setCommentsAmount(
                    entries.get(i).getComments().size()
            );
        }
        return entriesDto;
    }

    @PostMapping("/new")
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.OK)
    public String addEntry(@RequestBody EntryPostDto entryPostDto, @CurrentUser UserPrincipal currentUser) {
        entryService.addEntry(entryPostDto.getValue(), currentUser.getId());
        return "Server Status: OK";
    }

    @PostMapping("/{entryId}/like")
    @PreAuthorize("isAuthenticated()")
    public int updateLikers(@PathVariable Long entryId, @CurrentUser UserPrincipal currentUser) {
        if(entryService.isNotLiked(entryId, currentUser.getId())) entryService.addLiker(entryId, currentUser.getId());
        else entryService.removeLiker(entryId, currentUser.getId());
        return entryService.findEntryScoreById(entryId);
    }
}
