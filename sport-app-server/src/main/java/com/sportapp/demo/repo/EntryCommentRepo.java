package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.EntryComment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryCommentRepo extends JpaRepository<EntryComment, Long> {

  List<EntryComment> findAllByEntryId(Long entryId);
}
