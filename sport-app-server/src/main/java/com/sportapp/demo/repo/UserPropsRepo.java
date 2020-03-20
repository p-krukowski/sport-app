package com.sportapp.demo.repo;

import com.sportapp.demo.models.User;
import com.sportapp.demo.models.UserProps;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPropsRepo extends CrudRepository<UserProps, Long> {

    Optional<UserProps> findUserPropsByUser(User user);
}
