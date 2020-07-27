package com.sportapp.demo.models;

import com.sportapp.demo.models.social.Entry;
import com.sportapp.demo.models.social.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    User user;
    Entry entry;
    List<Entry> entries;

    @BeforeEach
    public void setUp() {
        user = new User();
        entry = new Entry();
        entries = new ArrayList<>();
    }

    @Test
    void shouldAddLikedEntry() {
        user.addLikedEntry(entry);

        assertEquals(1, user.getLikedEntries().size());
        assertNotEquals(2, user.getLikedEntries().size());
        assertNotEquals(-1, user.getLikedEntries().size());
    }

    @Test
    void shouldRemoveLikedEntry() {
        entries.add(entry);
        user.setLikedEntries(entries);
        user.removeLikedEntry(entry);

        assertEquals(0, user.getLikedEntries().size());
        assertNotEquals(2, user.getLikedEntries().size());
        assertNotEquals(-1, user.getLikedEntries().size());
    }
}