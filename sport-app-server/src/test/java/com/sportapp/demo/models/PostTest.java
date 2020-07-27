package com.sportapp.demo.models;

import com.sportapp.demo.models.social.Post;
import com.sportapp.demo.models.social.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PostTest {
    Post post;
    User user1;
    User user2;
    List<User> users;


    @BeforeEach
    public void setUp() {
        post = new Post();
        user1 = new User();
        user2 = new User();
        users = new ArrayList<>();
    }


    @Test
    void shouldUpdateScoreWithEmptyList() {
        //given
        users.add(user1);

        //when
        post.setScore(users);

        //then
        assertEquals(1, post.getScore());
    }

    @Test
    void shouldSetScore() {
        //given
        users.add(user1);
        post.setLikers(users);
        List<User> users2 = new ArrayList<>();
        users2.add(user1);
        users2.add(user2);

        //when
        post.setScore(users2);

        //then
        assertEquals(2, post.getScore());
    }

}