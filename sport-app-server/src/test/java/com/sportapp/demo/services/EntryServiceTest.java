package com.sportapp.demo.services;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import com.sportapp.demo.repo.EntryRepo;
import com.sportapp.demo.services.social.EntryService;
import com.sportapp.demo.services.social.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

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
        when(userService.findUserById(231L)).thenReturn(user);
        when(entryRepo.save(entry)).thenReturn(addToList(entry));

        entryService.addEntry("test", 231L);

        assertEquals(1, entries.size());
    }

    Entry addToList(Entry entry) {
        entries.add(entry);
        return entry;
    }

}