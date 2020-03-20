package com.sportapp.demo.controllers;

import com.sportapp.demo.models.Entry;
import com.sportapp.demo.models.POJOs.RequestLongPOJO;
import com.sportapp.demo.security.CurrentUser;
import com.sportapp.demo.security.UserPrincipal;
import com.sportapp.demo.services.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EntryController {

    private EntryService entryService;

    @Autowired
    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

    @GetMapping("/entries")
    @ResponseBody
    public List<Entry> getEntries() {
        return entryService.getAllEntriesSorted();
    }

    @PostMapping("/add-entry")
    @PreAuthorize("isAuthenticated()")
    public int addEntry(@RequestBody Entry entry, @CurrentUser UserPrincipal currentUser) {
        entryService.addEntry(entry, currentUser.getId());
        return 1;
    }

    @PostMapping("/plus-button")
    @PreAuthorize("isAuthenticated()")
    @ResponseBody
    public int addLiker(@RequestBody RequestLongPOJO idPOJO, @CurrentUser UserPrincipal currentUser) {
        return entryService.checkLikerStatus(idPOJO.id, currentUser.getId());
    }
}
