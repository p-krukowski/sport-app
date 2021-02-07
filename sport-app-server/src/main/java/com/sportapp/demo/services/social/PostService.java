package com.sportapp.demo.services.social;

import com.sportapp.demo.models.social.Post;
import com.sportapp.demo.models.social.User;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class PostService {

  public static void updateUpvoters(Post post, User user) {
    List<Long> upvoters = post.getUpvoters().stream()
        .map(User::getId)
        .collect(Collectors.toList());
    if (upvoters.contains(user.getId())) {
      post.setUpvoters(post.getUpvoters().stream()
          .filter(upvoter -> !upvoter.getId().equals(user.getId()))
          .collect(Collectors.toList()));
    } else {
      post.getUpvoters().add(user);
    }
    post.setScore(post.getUpvoters().size());
  }
}
