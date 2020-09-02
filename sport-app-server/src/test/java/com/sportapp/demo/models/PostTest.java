package com.sportapp.demo.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.sportapp.demo.models.social.Post;
import com.sportapp.demo.models.social.User;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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
        post.setUpvoters(users);
        List<User> users2 = new ArrayList<>();
        users2.add(user1);
        users2.add(user2);

        //when
        post.setScore(users2);

        //then
        assertEquals(2, post.getScore());
    }

}