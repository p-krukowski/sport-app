package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.UserProps;
import com.sportapp.demo.models.sportdata.LeagueSoccer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPropsRepo extends CrudRepository<UserProps, Long> {

    @Query("select u.leagues from UserProps u" +
            " where u.user.id = ?1")
    List<LeagueSoccer> findByUserId(Long id);
}
