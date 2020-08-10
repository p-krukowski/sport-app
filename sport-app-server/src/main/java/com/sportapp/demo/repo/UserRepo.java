package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByMail(String mail);

    @Query("select u from UserEntity u" +
            " left join fetch u.userProps" +
            " where u.id = ?1")
    User findUserWithPropsById(Long id);
}
