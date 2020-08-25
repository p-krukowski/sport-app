package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepo extends JpaRepository<Tag, Long> {

  Optional<Tag> findTagByName(String tagName);
}
