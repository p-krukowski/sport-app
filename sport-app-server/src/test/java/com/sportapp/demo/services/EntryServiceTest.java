package com.sportapp.demo.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import com.sportapp.demo.models.dtos.social.EntryPostDto;
import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import com.sportapp.demo.services.social.EntryService;
import com.sportapp.demo.services.social.UserService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class EntryServiceTest {

    @Mock
    EntryRepo entryRepo;
    @Mock
    UserService userService;

    @InjectMocks
    EntryService entryService;

    List<Entry> entries;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
        entries = new ArrayList<>();
    }

    @Test
    void shouldGetEntryById() {
        Entry entry = new Entry();
        entry.setId(0L);
        entry.setValue("test");
        when(entryRepo.findById(342L)).thenReturn(java.util.Optional.of(entry));
        Entry entry1 = entryService.findEntryById(342L);

        assertNotNull(entry1);
        assertEquals("test", entry1.getValue());
    }

    @Test
    void shouldAddEntry() {
        User user = new User();
        Entry entry = new Entry();
        EntryPostDto entryPostDto = new EntryPostDto();
        when(userService.findUserById(231L)).thenReturn(user);
        when(entryRepo.save(entry)).thenReturn(addToList(entry));

        entryService.addEntry(entryPostDto, 231L);

        assertEquals(1, entries.size());
    }

    Entry addToList(Entry entry) {
        entries.add(entry);
        return entry;
    }

}