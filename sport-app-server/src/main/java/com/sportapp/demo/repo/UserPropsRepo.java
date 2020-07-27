package com.sportapp.demo.repo;

import com.sportapp.demo.models.social.UserProps;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPropsRepo extends CrudRepository<UserProps, Long> {

}
